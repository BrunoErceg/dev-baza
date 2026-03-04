"use client";
import Link from "next/link";

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

import { useMessagesNotification } from "../hooks/use-messages-notification";
import { ConversationList } from "./conversation-list/conversation-list";

interface MessagesNavigationProps {
  initialUnreadCount: number;
  userId: string;
}

export function MessagesNotification({
  initialUnreadCount,
  userId,
}: MessagesNavigationProps) {
  const {
    unreadCount,
    isOpen,
    setIsOpen,
    isLoading,
    error,
    initialConversations,
  } = useMessagesNotification({
    initialUnreadCount,
    userId,
  });
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
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

        <ConversationList
          initialConversations={initialConversations}
          error={error}
          initaialIsLoading={isLoading}
        />

        <SheetFooter>
          <Link href="/poruke">Pogledaj sve razgovore</Link>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
