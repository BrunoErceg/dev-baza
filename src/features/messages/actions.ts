"use server";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import {
  actionValidation,
  ensureAuthenticated,
  ensureConversationParticipant,
} from "@lib/auth-utils";
import { prisma } from "@lib/prisma";
import { pusherServer } from "@lib/pusher";
import { Message } from "@prisma/client";

import { DataResponse } from "@/types/actions";

import { messageSchema } from "./schema";
import {
  notifyConversationIsRead,
  notifyNewMessage,
} from "./services/pusher-notifications";
import { ConversationListItem } from "./types";

export async function deleteConversation(
  conversationId: string,
  userId: string,
  otherUserId: string,
) {
  const session = await auth();
  let shouldRedirect = false;
  try {
    ensureAuthenticated(session);
    await ensureConversationParticipant(conversationId, session.user.id);
    await prisma.conversation.delete({
      where: { id: conversationId },
    });

    const notifyUsers = [userId, otherUserId];
    await Promise.all(
      notifyUsers.map((id) =>
        pusherServer.trigger(
          `user-${id}`,
          "remove-conversation",
          conversationId,
        ),
      ),
    );
    shouldRedirect = true;
  } catch (error) {
    console.log("DELETE_CONVERSATION_ERROR:", error);
    return { data: null, error: "Greška pri brisanju razgovora." };
  }

  if (shouldRedirect) {
    redirect("/poruke");
  }
}

export async function sendMessage(
  conversationId: string,
  rawData: unknown,
): Promise<DataResponse<Message | null>> {
  const session = await auth();

  try {
    ensureAuthenticated(session);

    const [validatedData] = await Promise.all([
      actionValidation(rawData, messageSchema),
      ensureConversationParticipant(conversationId, session.user.id),
    ]);

    const newMessage = await prisma.message.create({
      data: {
        conversationId: conversationId,
        senderId: session.user.id,
        content: validatedData.message,
      },
      include: {
        conversation: {
          include: {
            participants: {
              include: {
                user: { select: { id: true, username: true, image: true } },
              },
            },
          },
        },
      },
    });

    const participants = newMessage.conversation.participants;

    await notifyNewMessage(newMessage, participants);

    return { data: newMessage, error: null };
  } catch (error) {
    console.log("SEND_MESSAGE_ERROR:", error);
    return { data: null, error: "Greška pri slanju poruke." };
  }
}

export async function setMessagesAsRead(
  conversationId: string,
  userId: string,
) {
  const session = await auth();
  try {
    ensureAuthenticated(session);

    const result = await prisma.message.updateMany({
      where: {
        conversationId: conversationId,
        isRead: false,
        NOT: { senderId: userId },
      },

      data: { isRead: true },
    });

    await notifyConversationIsRead(userId, conversationId, result.count);

    return { data: result.count, error: null };
  } catch (error) {
    console.log("SET_MESSAGES_AS_READ_ERROR:", error);
    return { data: null, error: "Greška pri postavljanju obavijesti." };
  }
}

export async function createConversation(
  otherUserId: string,
): Promise<DataResponse<ConversationListItem | null>> {
  const session = await auth();

  try {
    ensureAuthenticated(session);
    const currentUserId = session.user.id;

    const newConversation: ConversationListItem =
      await prisma.conversation.create({
        data: {
          participants: {
            create: [{ userId: currentUserId }, { userId: otherUserId }],
          },
        },

        include: {
          participants: {
            include: {
              user: { select: { username: true, id: true, image: true } },
            },
          },
          messages: {
            orderBy: { createdAt: "desc" },
            take: 1,
          },
        },
      });

    await pusherServer.trigger(
      `user-${currentUserId}`,
      "new-conversation",
      newConversation,
    );
    await pusherServer.trigger(
      `user-${otherUserId}`,
      "new-conversation",
      newConversation,
    );

    return { data: newConversation, error: null };
  } catch (error) {
    console.log("CREATE_CONVERSATION_ERROR:", error);
    return { data: null, error: "Greška pri kreiranju razgovora." };
  }
}
