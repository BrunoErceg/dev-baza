import { useEffect, useState } from "react";

import { pusherClient } from "@lib/pusher";

import { getConversations } from "../data";
import { ConversationListItem } from "../types";
import { useActiveChat } from "./use-active-chat";

interface UpdateMessageCount {
  count: number;
  type: "INCREMENT" | "DECREMENT";
  conversationId: string;
}

interface UseMessagesNavigationProps {
  initialUnreadCount: number;
  userId: string;
}

export function useMessagesNotification({
  initialUnreadCount,
  userId,
}: UseMessagesNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(initialUnreadCount);
  const [isLoading, setIsLoading] = useState(true);
  const [initialConversations, setInitialConversations] = useState<
    ConversationListItem[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const { activeChatId } = useActiveChat();

  useEffect(() => {
    const channel = pusherClient.subscribe(
      `user-messages-notification-${userId}`,
    );

    channel.bind("update-message-count", (data: UpdateMessageCount) => {
      if (data.type === "INCREMENT" && data.conversationId !== activeChatId) {
        setUnreadCount((prev) => prev + data.count);
      } else if (data.type === "DECREMENT") {
        setUnreadCount((prev) => prev - data.count);
      }
    });

    return () => {
      pusherClient.unsubscribe(`user-messages-notification-${userId}`);
    };
  }, [userId, activeChatId]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (isOpen) {
        const { data: conversation, error } = await getConversations();

        if (error) setError(error);
        else setInitialConversations((prev) => [...conversation]);
      }
      setIsLoading(false);
    };

    if (isOpen) fetchData();
  }, [isOpen]);

  return {
    unreadCount,
    isOpen,
    setIsOpen,
    initialConversations,
    error,
    isLoading,
  };
}
