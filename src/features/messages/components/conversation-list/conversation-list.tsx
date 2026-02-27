"use client";

import { useConversationList } from "@features/messages/hooks/use-conversation-list";

import { ErrorState } from "@ui/error-state";

import { Conversation } from "./conversation";
import { ConversationListSkeleton } from "./conversation-list-skeleton";

export function ConversationList({}) {
  const { conversations, isLoading, error } = useConversationList();

  if (isLoading) return <ConversationListSkeleton />;
  if (error) return <ErrorState description={error} />;

  return (
    <div>
      {conversations.map((conversation) => (
        <Conversation key={conversation.id} conversation={conversation} />
      ))}
    </div>
  );
}
