import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

import { pusherClient } from "@lib/pusher";
import { Message } from "@prisma/client";

import { setMessagesAsRead } from "../actions";
import { getConversation, getConversationMessages } from "../data";
import { useActiveChat } from "./use-active-chat";

interface User {
  id: string;
  username: string;
  image: string;
}

export function useChat() {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const { activeChatId } = useActiveChat();

  const [isLoading, setIsLoading] = useState(true);
  const [otherUser, setOtherUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!activeChatId || !userId) return;

    let isMounted = true;

    const initChat = async () => {
      setIsLoading(true);
      setError(null);
      setMessages([]);

      try {
        const [_, conv, msg] = await Promise.all([
          setMessagesAsRead(activeChatId, userId),
          getConversation(activeChatId),
          getConversationMessages(activeChatId),
        ]);

        if (!isMounted) return;

        if (msg.error) {
          setError(msg.error);
        } else {
          setMessages(msg.data || []);
          const other = conv.data?.participants.find(
            (p) => p.userId !== userId,
          )?.user;
          if (other) setOtherUser(other);
        }
      } catch (err) {
        if (isMounted) setError("Došlo je do pogreške.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    initChat();
    return () => {
      isMounted = false;
    };
  }, [activeChatId, userId]);

  useEffect(() => {
    if (!activeChatId || !userId) return;

    const channel = pusherClient.subscribe(`conversation-${activeChatId}`);
    channel.bind("new-message", (newMsg: Message) => {
      setMessages((prev) => [...prev, newMsg]);
      const markAsRead = async () =>
        await setMessagesAsRead(activeChatId, userId);

      markAsRead();
    });

    return () => {
      channel.unbind_all();
      pusherClient.unsubscribe(`conversation-${activeChatId}`);
    };
  }, [activeChatId, userId]);

  return {
    messages,
    error,
    isLoading,
    otherUser,
    userId,
    activeChatId,
    scrollRef,
  };
}
