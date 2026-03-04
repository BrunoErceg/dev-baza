"use server";

import { auth } from "@/auth";
import {
  actionValidation,
  ensureAuthenticated,
  ensureConversationParticipant,
  handleError,
} from "@lib/auth-utils";
import { prisma } from "@lib/prisma";
import { pusherServer } from "@lib/pusher";
import { Conversation, Message } from "@prisma/client";

import { DataResponse } from "@/types/actions";

import { messageSchema } from "./schema";
import {
  notifyConversationIsRead,
  notifyNewMessage,
} from "./services/pusher-notifications";
import { ConversationListItem } from "./types";
import { formatConversation, formatConversations } from "./utils";

export async function createConversation(
  otherUserId: string,
): Promise<DataResponse<ConversationListItem | null>> {
  const session = await auth();

  try {
    ensureAuthenticated(session);
    const userId = session.user.id;

    const newRawConv = await prisma.conversation.create({
      data: {
        participants: {
          create: [{ userId: userId }, { userId: otherUserId }],
        },
      },
      include: {
        participants: {
          include: {
            user: true,
          },
        },
        messages: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
    });

    const formattedConv = formatConversation(newRawConv, userId);

    await Promise.all([
      pusherServer.trigger(`user-${userId}`, "new-conversation", formattedConv),
      pusherServer.trigger(
        `user-${otherUserId}`,
        "new-conversation",
        formattedConv,
      ),
    ]);

    return { data: formattedConv, error: null };
  } catch (error) {
    return handleError(error, "CREATE_CONVERSATION_ERROR");
  }
}

export async function deleteConversation(
  conversationId: string,
  userId: string,
  otherUserId: string,
): Promise<DataResponse<Conversation | null>> {
  const session = await auth();
  try {
    ensureAuthenticated(session);
    await ensureConversationParticipant(conversationId, session.user.id);
    const result = await prisma.conversation.delete({
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

    return { data: result, error: null };
  } catch (error) {
    return handleError(error, "DELETE_CONVERSATION_ERROR");
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

    const newMessage = await prisma.$transaction(async (tx) => {
      const [msg, _] = await Promise.all([
        tx.message.create({
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
        }),

        tx.conversation.update({
          where: { id: conversationId },
          data: { lastMessageAt: new Date() },
        }),
      ]);

      return msg;
    });

    const participants = newMessage.conversation.participants;

    await notifyNewMessage(newMessage, participants);

    return { data: newMessage, error: null };
  } catch (error) {
    return handleError(error, "SEND_MESSAGE_ERROR");
  }
}

export async function setMessagesAsRead(
  conversationId: string,
  userId: string,
): Promise<DataResponse<number | null>> {
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
    return handleError(error, "SET_MESSAGES_AS_READ_ERROR");
  }
}
