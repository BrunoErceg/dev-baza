"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { pusherClient } from "@lib/pusher";
import { MessageCircleMore } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@ui/sheet";

import { MessagesProvider } from "../messages-context";
import { ConversationList } from "./conversation-list/conversation-list";

interface MessagesNavigationProps {
  initialUnreadCount: number;
  userId: string;
}

interface UpdateMessageCount {
  count: number;
  type: "INCREMENT" | "DECREMENT";
  conversationId: string;
}

export function MessagesNotification({
  initialUnreadCount,
  userId,
}: MessagesNavigationProps) {
  const searchParams = useSearchParams();
  const activeChatId = searchParams.get("id");
  const [unreadCount, setUnreadCount] = useState(initialUnreadCount);

  useEffect(() => {
    const channel = pusherClient.subscribe(`user-${userId}`);

    channel.bind("update-message-count", (data: UpdateMessageCount) => {
      const isActiveChat = data.conversationId === activeChatId;
      setUnreadCount((prev) => {
        if (data.type === "DECREMENT") {
          return prev - data.count;
        } else if (isActiveChat) {
          return prev;
        } else {
          return prev + data.count;
        }
      });
    });

    channel.bind("reduce-message-count", (count: number) => {
      setUnreadCount((prev) => {
        return prev - count;
      });
    });
    return () => {
      pusherClient.unsubscribe(`user-${userId}`);
    };
  }, [userId, activeChatId]);

  return (
    <Sheet>
      <SheetTrigger>
        <div className="relative">
          <MessageCircleMore className="size-6 cursor-pointer md:size-8" />
          {unreadCount > 0 && (
            <div className="absolute top-0 -right-1 size-3.5 rounded-full bg-red-500 text-[10px] text-white">
              {unreadCount}
            </div>
          )}
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Razgovori</SheetTitle>
          <SheetDescription>
            Ovdje možete vidjeti svu vašu komunikaciju s drugim korisnicima.
          </SheetDescription>
        </SheetHeader>

        <ConversationList />

        <SheetFooter>
          <Link href="/poruke">Pogledaj sve razgovore</Link>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
