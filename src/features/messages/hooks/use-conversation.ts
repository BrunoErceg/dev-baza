import { cn } from "@lib/utils";

import { useMessages } from "../messages-context";
import { ConversationListItem } from "../types";

interface UseConversationItemProps {
  conversation: ConversationListItem;
}

export function useConversationItem({
  conversation,
}: UseConversationItemProps) {
  const { userId, activeChatId } = useMessages();
  const { id, participants, messages } = conversation;
  const otherUser = participants.find((p) => p.userId !== userId)?.user;
  const message = messages.length > 0 ? messages[0] : null;
  const isRead = message && message.isRead;
  const userIsSender = message && message.senderId === userId;
  const isActiveChat = id === activeChatId;

  const isNewUnreadMessage =
    !userIsSender && !message?.isRead && !isActiveChat && message
      ? true
      : false;

  const messageText = userIsSender
    ? "Vi:" + message?.content
    : message?.content || "Nema poruka";

  const linkClassName = cn(
    "flex cursor-pointer items-center gap-5 px-3 py-4 duration-200 hover:bg-gray-100",
    isActiveChat && "bg-gray-100",
  );

  const messageClassName = cn(
    "line-clamp-1 break-all",
    isNewUnreadMessage && "font-semibold text-gray-950",
  );

  return {
    id,
    otherUser: otherUser!,
    message,
    isNewUnreadMessage,
    messageText,
    linkClassName,
    messageClassName,
  };
}
