import { pusherServer } from "@lib/pusher";
import { Message } from "@prisma/client";

export async function notifyNewMessage(
  newMessage: Message,
  participants: any[],
) {
  const receiver = participants.find((p) => p.userId !== newMessage.senderId);
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

    // 3. Brojač za primatelja
    receiver &&
      pusherServer.trigger(`user-${receiver.userId}`, "update-message-count", {
        conversationId: newMessage.conversationId,
        type: "INCREMENT",
        count: 1,
      }),
  ]);
}

export async function notifyConversationIsRead(
  userId: string,
  conversationId: string,
  count: number,
) {
  await Promise.all([
    pusherServer.trigger(`user-${userId}`, "update-message-count", {
      conversationId,
      type: "DECREMENT",
      result: count,
    }),
    pusherServer.trigger(
      `user-${userId}`,
      "set-conversation-as-read",
      conversationId,
    ),
  ]);
}
