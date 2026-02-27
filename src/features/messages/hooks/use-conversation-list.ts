import { useEffect, useState } from "react";

import { pusherClient } from "@lib/pusher";
import { Message } from "@prisma/client";

import { getConversations } from "../data";
import { useMessages } from "../messages-context";
import { ConversationListItem } from "../types";

export function useConversationList() {
  const { userId, setActiveChat } = useMessages();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conversations, setConversations] = useState<ConversationListItem[]>(
    [],
  );

  useEffect(() => {
    const fetchConversations = async () => {
      setIsLoading(true);
      const { data, error } = await getConversations();
      if (error) {
        setError(error);
      } else {
        setConversations(data);
      }
      setIsLoading(false);
    };

    fetchConversations();
  }, []);

  useEffect(() => {
    const channel = pusherClient.subscribe(`user-${userId}`);

    channel.bind("new-conversation", (conversation: ConversationListItem) => {
      setConversations((prev) => [conversation, ...prev]);
    });

    channel.bind("remove-conversation", (conversationId: string) => {
      setConversations((prev) => prev.filter((c) => c.id !== conversationId));
      setActiveChat(null);
    });

    channel.bind("update-conversation", (newMessage: Message) => {
      setConversations((prev) => {
        const updated = prev.map((c) => {
          if (c.id === newMessage.conversationId) {
            c.messages[0] = newMessage;
          }
          return c;
        });
        return [...updated];
      });
    });

    channel.bind("set-conversation-as-read", (conversationId: string) => {
      setConversations((prev) => {
        const filtered = prev.map((c) => {
          if (c.id === conversationId) {
            if (c.messages.length !== 0) c.messages[0].isRead = true;
          }
          return c;
        });
        return [...filtered];
      });
    });
    return () => {
      channel.unbind_all();
      pusherClient.unsubscribe(`user-${userId}`);
    };
  }, [userId]);

  return { conversations, isLoading, error };
}
