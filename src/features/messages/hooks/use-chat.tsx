import { useEffect, useState } from "react";

import { pusherClient } from "@lib/pusher";
import { Message } from "@prisma/client";

import { setMessagesAsRead } from "../actions";
import { getConversation, getConversationMessages } from "../data";
import { useMessages } from "../messages-context";

interface User {
  id: string;
  username: string;
  image: string;
}

export function useChat() {
  const { userId, activeChatId } = useMessages();
  const [isLoading, setIsLoading] = useState(true);
  const [otherUser, setOtherUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      if (!activeChatId) return;
      const [conv, msg] = await Promise.all([
        getConversation(activeChatId),
        getConversationMessages(activeChatId),
      ]);

      const otherUser = conv.data?.participants.find(
        (p) => p.userId !== userId,
      )?.user;
      if (otherUser) {
        setOtherUser(otherUser);
      }

      if (msg.error) {
        setError(msg.error);
      } else {
        setMessages(msg.data);
      }

      setIsLoading(false);
    };

    const updateReadStatus = async () => {
      if (!activeChatId) return;
      await setMessagesAsRead(activeChatId, userId);
    };
    updateReadStatus();
    fetchData();
  }, [activeChatId]);

  useEffect(() => {
    const channel = pusherClient.subscribe(`conversation-${activeChatId}`);

    channel.bind("new-message", (newMsg: Message) => {
      setMessages((prev) => [...prev, newMsg]);
    });
    return () => {
      channel.unbind("new-message");
      pusherClient.unsubscribe(`user-${activeChatId}`);
    };
  }, [activeChatId]);

  useEffect(() => {
    const markMessagesAsRead = async () => {
      if (!activeChatId) return;
      await setMessagesAsRead(activeChatId, userId);
    };

    markMessagesAsRead();
  }, [messages]);

  return { messages, error, isLoading, otherUser };
}
