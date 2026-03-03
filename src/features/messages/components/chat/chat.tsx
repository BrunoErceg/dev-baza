"use client";
import { cn } from "@lib/utils";
import { MessageCircleOff } from "lucide-react";

import { useChat } from "@features/messages/hooks/use-chat";

import { EmptyState } from "@ui/empty-state";
import { ErrorState } from "@ui/error-state";
import { Spinner } from "@ui/spinner";

import { NewConversation } from "../new-conversation/new-conversation";
import { ChatBody } from "./chat-body";
import { ChatFooter } from "./chat-footer";
import { ChatHeader } from "./chat-header";

export function Chat({ className }: { className?: string }) {
  const { messages, isLoading, error, activeChatId } = useChat();

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
        title={"Greška pri hvatanju poruka."}
        description={"Pokusajte ponovo."}
      />
    );

  return (
    <div className={cn("flex flex-col", className)}>
      <ChatHeader />

      {isLoading ? (
        <div className="flex flex-1 items-center justify-center">
          <Spinner className="size-10 text-gray-300" />
        </div>
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
