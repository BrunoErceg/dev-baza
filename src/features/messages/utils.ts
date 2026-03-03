import { RawConversation } from "./types";

export const formatConversation = (
  rawConversation: RawConversation,
  userId: string,
) => {
  return {
    id: rawConversation.id,
    updatedAt: rawConversation.updatedAt,
    otherUser: rawConversation.participants.find((p) => p.userId !== userId)!
      .user,
    lastMessage: rawConversation.messages[0] || null,
  };
};

export function formatConversations(
  rawConversation: RawConversation[],
  userId: string,
) {
  return rawConversation.map((conv) => formatConversation(conv, userId));
}
