"use client";

import { formatRelativeDate } from "@lib/utils";

import { useConversationItem as useConversation } from "@features/messages/hooks/use-conversation";
import { useMessages } from "@features/messages/messages-context";
import { ProfileAvatar } from "@features/users/components/profile-avatar";

import { Large, Muted } from "@ui/typography";

import { ConversationListItem } from "../../types";

export function Conversation({
  conversation,
}: {
  conversation: ConversationListItem;
}) {
  const {
    id,
    otherUser,
    message,
    isNewUnreadMessage,
    messageText,
    linkClassName,
    messageClassName,
  } = useConversation({ conversation });
  const { setActiveChat } = useMessages();
  const onSelect = async () => {
    setActiveChat(id);
  };

  return (
    <div onClick={() => onSelect()} className={linkClassName}>
      <ProfileAvatar className="size-14" image={otherUser.image} />
      <div className="flex-1">
        <Large className="-translate-x-0.5">@{otherUser.username}</Large>
        <Muted className={messageClassName}>{messageText}</Muted>
      </div>

      {message && (
        <div className="flex items-center gap-2">
          <TimeAgo createdAt={message.createdAt} />
          {isNewUnreadMessage && <BlueDot />}
        </div>
      )}
    </div>
  );
}

const TimeAgo = ({ createdAt }: { createdAt: Date }) => {
  return <p>{formatRelativeDate(createdAt)}</p>;
};

const BlueDot = () => {
  return <div className="size-2 rounded-full bg-blue-600" />;
};
