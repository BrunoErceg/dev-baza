import Link from "next/link";

import { cn, formatRelativeDate } from "@lib/utils";

import { useConversationItem } from "@features/messages/hooks/use-conversation-item";
import { ConversationListItem } from "@features/messages/types";
import { ProfileAvatar } from "@features/users/components/profile-avatar";

import { Large, Muted } from "@ui/typography";

export function Conversation({
  conversation,
}: {
  conversation: ConversationListItem;
}) {
  const { otherUser, lastMessage, isSentByMe, isActive, isUnread } =
    useConversationItem({ conversation });

  return (
    <Link
      href={`/poruke/${conversation.id}`}
      className={cn(
        "flex cursor-pointer items-center gap-5 px-3 py-4 duration-200 hover:bg-gray-100",
        isActive && "bg-gray-100",
      )}
    >
      <ProfileAvatar className="size-14" image={otherUser.image} />

      <div className="flex-1 overflow-hidden">
        <Large className="truncate">@{otherUser.username}</Large>
        <Muted
          className={cn("truncate", isUnread && "font-bold text-gray-950")}
        >
          {isSentByMe && "Vi: "}
          {lastMessage?.content || "Nema poruka"}
        </Muted>
      </div>

      <div className="flex items-center gap-2">
        {lastMessage && (
          <>
            <Muted className="text-xs whitespace-nowrap">
              {formatRelativeDate(lastMessage.createdAt)}
            </Muted>
            {isUnread && (
              <div className="size-2.5 translate-y-0.5 rounded-full bg-blue-600" />
            )}
          </>
        )}
      </div>
    </Link>
  );
}
