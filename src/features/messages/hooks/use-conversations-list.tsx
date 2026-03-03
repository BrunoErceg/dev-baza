import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { pusherClient } from "@lib/pusher";
import { Message } from "@prisma/client";

import { ConversationListItem } from "../types";
import { useActiveChat } from "./use-active-chat";

export function useConversationsList(
  initialConversations: ConversationListItem[],
  initialIsLoading?: boolean,
) {
  const { data: session } = useSession();
  const { activeChatId } = useActiveChat();
  const userId = session?.user?.id;
  const [isLoading, setIsLoading] = useState(initialIsLoading);
  const [conversations, setConversations] = useState(initialConversations);

  useEffect(() => {
    setConversations(initialConversations);
  }, [initialConversations]);

  useEffect(() => {
    setIsLoading(initialIsLoading);
  }, [initialIsLoading]);

  useEffect(() => {
    const channel = pusherClient.subscribe(`user-${userId}`);

    channel.bind("new-conversation", (conversation: ConversationListItem) => {
      setConversations((prev) => [conversation, ...prev]);
    });

    channel.bind("remove-conversation", (conversationId: string) => {
      setConversations((prev) => prev.filter((c) => c.id !== conversationId));
    });

    channel.bind("update-conversation", (newMessage: Message) => {
      setConversations((prev) => {
        let updatedConv = prev.find((c) => c.id === newMessage.conversationId)!;
        updatedConv.lastMessage = newMessage;

        const filtered = prev.filter((c) => c.id !== newMessage.conversationId);
        return [updatedConv, ...filtered];
      });
    });

    channel.bind("set-conversation-as-read", (conversationId: string) => {
      setConversations((prev) => {
        const filtered = prev.map((c) => {
          if (c.id === conversationId) {
            if (c.lastMessage) c.lastMessage.isRead = true;
          }
          return c;
        });
        return [...filtered];
      });
    });

    channel.bind("new-message", (conversationId: string) => {
      if (conversationId === activeChatId) {
        setConversations((prev) => {
          const filtered = prev.map((c) => {
            if (c.id === conversationId) {
              if (c.lastMessage) c.lastMessage.isRead = false;
            }
            return c;
          });
          return [...filtered];
        });
      }
    });

    return () => {
      channel.unbind_all();
      pusherClient.unsubscribe(`user-${userId}`);
    };
  }, [userId]);

  return { conversations, isLoading };
}
