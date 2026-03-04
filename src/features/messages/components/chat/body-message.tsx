import { cn, formatRelativeDate } from "@lib/utils";
import { Message } from "@prisma/client";
import { CheckCheck, Dot } from "lucide-react";

import { Muted } from "@ui/typography";

export function UserMessage({ message }: { message: Message }) {
  return (
    <div key={message.id} className="flex flex-col items-end">
      <div className="flex max-w-full items-center gap-2 self-end md:max-w-2/3">
        <div className="flex items-center">
          <Muted className="text-xs">
            {formatRelativeDate(message.createdAt)}
          </Muted>
          <Dot size={20} className="text-gray-400" />
        </div>

        <div className={cn("rounded-xl bg-gray-200 px-4 py-2")}>
          {message.content}
        </div>
      </div>
    </div>
  );
}

export function OtherUserMessage({ message }: { message: Message }) {
  return (
    <div className="flex max-w-full flex-col items-start self-start md:max-w-2/3">
      <div className="flex items-center">
        <div className="rounded-xl bg-blue-200 px-4 py-2">
          {message.content}
        </div>
        <div className="flex items-center">
          <Dot size={20} className="text-gray-400" />
          <Muted className="text-xs">
            {formatRelativeDate(message.createdAt)}
          </Muted>
        </div>
      </div>
    </div>
  );
}
