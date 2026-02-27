"use client";
import { useEffect, useRef, useState } from "react";

import { cn } from "@lib/utils";
import { Message } from "@prisma/client";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/overlayscrollbars.css";

import { useMessages } from "@features/messages/messages-context";

import { OtherUserMessage, UserMessage } from "./body-message";

interface ChatBodyProps {
  messages: Message[];
  className?: string;
}

export function ChatBody({ messages, className }: ChatBodyProps) {
  const { userId } = useMessages();
  const osRef = useRef<any>(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const osInstance = osRef.current?.osInstance();
      if (osInstance) {
        const { scrollOffsetElement } = osInstance.elements();
        scrollOffsetElement.scrollTo({
          top: scrollOffsetElement.scrollHeight,
          behavior: "instant",
        });
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [messages]);

  return (
    <OverlayScrollbarsComponent
      ref={osRef}
      defer
      options={{
        scrollbars: {
          autoHide: "leave",
          theme: "os-theme-dark",
        },
      }}
      className={cn("flex p-4", className)}
    >
      <div className="flex flex-col gap-5">
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
      </div>
    </OverlayScrollbarsComponent>
  );
}
