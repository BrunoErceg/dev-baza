"use client";

import { MessageCircleOff } from "lucide-react";

import { useConversationsList } from "@features/messages/hooks/use-conversations-list";
import { ConversationListItem } from "@features/messages/types";

import { EmptyState } from "@ui/empty-state";
import { ErrorState } from "@ui/error-state";

import { NewConversation } from "../new-conversation/new-conversation";
import { Conversation } from "./conversation";
import { ConversationsSkeleton } from "./conversations-skeleton";

interface ConversationListProps {
  initialConversations: ConversationListItem[];
  error: string | null;
  initaialIsLoading?: boolean;
}

export function ConversationList({
  initialConversations,
  error,
  initaialIsLoading = false,
}: ConversationListProps) {
  const { conversations, isLoading } = useConversationsList(
    initialConversations,
    initaialIsLoading,
  );

  if (error) return <ErrorState description={error} />;

  if (isLoading) return <ConversationsSkeleton />;

  if (conversations.length === 0)
    return (
      <EmptyState
        Icon={MessageCircleOff}
        title="Još nemaš razgovora"
        description="Pronađi korisnike i započni komunikaciju. Tvoje poruke će se pojaviti ovdje."
        cta={<NewConversation />}
      />
    );

  return (
    <div className="overflow-auto">
      {conversations.map((conversation) => (
        <Conversation key={conversation.id} conversation={conversation} />
      ))}
    </div>
  );
}
