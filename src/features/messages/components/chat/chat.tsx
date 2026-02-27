"use client";
import { cn } from "@lib/utils";
import { MessageCircleOff } from "lucide-react";

import { useChat } from "@features/messages/hooks/use-chat";
import { useMessages } from "@features/messages/messages-context";

import { EmptyState } from "@ui/empty-state";
import { ErrorState } from "@ui/error-state";
import { H1 } from "@ui/typography";

import { NewConversation } from "../new-conversation/new-conversation";
import { ChatBody } from "./chat-body";
import { ChatBodySkeleton } from "./chat-body-skeleton";
import { ChatFooter } from "./chat-footer";
import { ChatHeader } from "./chat-header";

export function Chat({ className }: { className?: string }) {
  const { activeChatId } = useMessages();
  const { messages, error, isLoading, otherUser } = useChat();

  if (!activeChatId)
    return (
      <EmptyState
        Icon={MessageCircleOff}
        title={"Započni razgovor"}
        description={"Pronađi prijatelje ili kolege i pošalji prvu poruku."}
        cta={<NewConversation />}
      />
    );

  if (error)
    return (
      <ErrorState
        Icon={MessageCircleOff}
        title={"Nije moguca pristup porukama."}
        description={"Pokusajte ponovo."}
      />
    );

  return (
    <div className={cn("flex flex-col", className)}>
      <ChatHeader />

      {isLoading ? (
        <ChatBodySkeleton className="flex-1" />
      ) : !messages.length ? (
        <>
          <EmptyState
            Icon={MessageCircleOff}
            title={"Tišina u ovom razgovoru..."}
            description={"Nema poruka u ovom razgovoru."}
            className="flex-1"
          />
        </>
      ) : (
        <ChatBody messages={messages} className="flex-1" />
      )}

      <ChatFooter />
    </div>
  );
}
