import { Prisma } from "@prisma/client";

import {
  getConversation,
  getConversationMessages,
  getConversations,
} from "./data";

export type RawConversation = Prisma.ConversationGetPayload<{
  include: {
    participants: { include: { user: true } };
    messages: true;
  };
}>;

export type ConversationListItem = Awaited<
  ReturnType<typeof getConversations>
>["data"][number];

export type Conversation = Awaited<ReturnType<typeof getConversation>>["data"];

export type MessagesWithSender = Awaited<
  ReturnType<typeof getConversationMessages>
>["data"][number];
