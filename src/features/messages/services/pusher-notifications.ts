import { pusherServer } from "@lib/pusher";
import { Message } from "@prisma/client";

export async function notifyNewMessage(
  newMessage: Message,
  participants: any[],
) {
  const receiver = participants.find((p) => p.userId !== newMessage.senderId)!;
  const participantIds = participants.map((p) => `user-${p.userId}`);

  return Promise.all([
    // 1. Kanali za oba korisnika (update liste razgovora)
    pusherServer.trigger(participantIds, "update-conversation", newMessage),

    // 2. Kanal samog chata (nova poruka)
    pusherServer.trigger(
      `conversation-${newMessage.conversationId}`,
      "new-message",
      newMessage,
    ),

    pusherServer.trigger(`user-${receiver.userId}`, "new-message", newMessage),

    // 3. Brojač za primatelja

    pusherServer.trigger(
      `user-messages-notification-${receiver.userId}`,
      "update-message-count",
      {
        type: "INCREMENT",
        conversationId: newMessage.conversationId,
        count: 1,
      },
    ),
  ]);
}

export async function notifyConversationIsRead(
  userId: string,
  conversationId: string,
  count: number,
) {
  await Promise.all([
    pusherServer.trigger(
      `user-messages-notification-${userId}`,
      "update-message-count",
      {
        type: "DECREMENT",
        conversationId,
        count: count,
      },
    ),
    pusherServer.trigger(
      `user-${userId}`,
      "set-conversation-as-read",
      conversationId,
    ),
  ]);
}
