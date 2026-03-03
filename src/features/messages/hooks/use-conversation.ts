import { useSession } from "next-auth/react";

import { ConversationListItem } from "../types";
import { useActiveChat } from "./use-active-chat";

interface UseConversationItemProps {
  conversation: ConversationListItem;
}

export function useConversation({ conversation }: UseConversationItemProps) {
  const { data: session } = useSession();
  const { activeChatId } = useActiveChat();

  const userId = session?.user?.id;
  const { id, otherUser, lastMessage } = conversation;

  const isSentByMe = lastMessage?.senderId === userId;
  const isActive = id === activeChatId;

  // Logika za nepročitano: Poruka postoji, nije moja, nije pročitana i chat nije otvoren
  const isUnread =
    !!lastMessage && !isSentByMe && !lastMessage.isRead && !isActive;

  return {
    otherUser: otherUser!,
    lastMessage,
    isSentByMe,
    isActive,
    isUnread,
  };
}
