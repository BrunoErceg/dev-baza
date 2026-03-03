"use client";
import { cn } from "@lib/utils";
import { Message } from "@prisma/client";
import "overlayscrollbars/overlayscrollbars.css";

import { useChat } from "@features/messages/hooks/use-chat";

import { OtherUserMessage, UserMessage } from "./body-message";

interface ChatBodyProps {
  messages: Message[];
  className?: string;
}

export function ChatBody({ messages, className }: ChatBodyProps) {
  const { scrollRef, userId } = useChat();

  return (
    <div className={cn("flex flex-col gap-5 overflow-auto p-4", className)}>
      {messages.map((message) => {
        return (
          <div key={message.id}>
            {message.senderId === userId ? (
              <UserMessage key={message.id} message={message} />
            ) : (
              <OtherUserMessage key={message.id} message={message} />
            )}
          </div>
        );
      })}
      <div ref={scrollRef} />
    </div>
  );
}
