"use server";
import { auth } from "@/auth";
import { ensureAuthenticated } from "@lib/auth-utils";
import { prisma } from "@lib/prisma";
import { Participant } from "@prisma/client";

import { DataResponse } from "@/types/actions";

import { formatConversations } from "./utils";

export async function getConversations() {
  const session = await auth();
  const userId = session.user.id;
  try {
    ensureAuthenticated(session);

    const rawConvs = await prisma.conversation.findMany({
      where: { participants: { some: { userId: userId } } },
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
      orderBy: { lastMessageAt: "desc" },
    });

    const formattedConvs = formatConversations(rawConvs, userId);

    return { data: formattedConvs || [], error: null };
  } catch (error) {
    console.log("GET_CONVERSATIONS_ERROR:", error);
    return { data: [], error: "Greška pri hvatanju podataka" };
  }
}

export async function getConversation(id: string) {
  const session = await auth();

  try {
    ensureAuthenticated(session);
    const conversation = await prisma.conversation.findUnique({
      where: { id: id },
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

    if (!conversation) return { data: null, error: null };

    return { data: conversation, error: null };
  } catch (error) {
    console.log("GET_CONVERSATION_ERROR:", error);
    return { data: null, error: "Greška pri hvatanju podataka" };
  }
}

export async function getConversationParticipants(
  conversationId: string,
): Promise<DataResponse<Participant[]>> {
  try {
    const participants = await prisma.participant.findMany({
      where: { conversationId: conversationId },
    });

    return { data: participants || [], error: null };
  } catch (error) {
    console.log("GET_CONVERSATION_PARTICIPANTS_ERROR:", error);
    return { data: [], error: "Greška pri hvatanju podataka" };
  }
}

export async function getConversationMessages(id: string) {
  try {
    const messages = await prisma.message.findMany({
      where: { conversationId: id },
      include: {
        sender: { select: { username: true, id: true, image: true } },
      },
      orderBy: { createdAt: "asc" },
    });
    return { data: messages, error: null };
  } catch (error) {
    console.log("GET_CONVERSATION_MESSAGES_ERROR:", error);
    return { data: [], error: "Greska pri hvatanju podataka" };
  }
}

export async function getUnreadMessagesCount(
  userId: string,
): Promise<DataResponse<number>> {
  const session = await auth();
  try {
    ensureAuthenticated(session);
    const unreadMessagesCount = await prisma.message.count({
      where: {
        conversation: {
          participants: { some: { userId } },
        },
        senderId: { not: userId },
        isRead: false,
      },
    });
    return { data: unreadMessagesCount, error: null };
  } catch (error) {
    console.log("GET_UNREAD_MESSAGES_COUNT_ERROR:", error);
    return { data: 0, error: "Greška pri hvatanju podataka." };
  }
}
