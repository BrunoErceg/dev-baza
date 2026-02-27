import {
  getConversation,
  getConversationMessages,
  getConversations,
} from "./data";

export type ConversationListItem = Awaited<
  ReturnType<typeof getConversations>
>["data"][number];

export type Conversation = Awaited<ReturnType<typeof getConversation>>["data"];

export type MessagesWithSender = Awaited<
  ReturnType<typeof getConversationMessages>
>["data"][number];
