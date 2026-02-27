"use client";
import Link from "next/link";

import { Trash2 } from "lucide-react";

import { deleteConversation } from "@features/messages/actions";
import { useChat } from "@features/messages/hooks/use-chat";
import { useMessages } from "@features/messages/messages-context";
import { ProfileAvatar } from "@features/users/components/profile-avatar";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@ui/alert-dialog";
import { Large } from "@ui/typography";

import { ChatHeaderSkeleton } from "./chat-header-skeleton";

export function ChatHeader() {
  const { userId, activeChatId } = useMessages();
  const { otherUser, isLoading } = useChat();

  if (isLoading) return <ChatHeaderSkeleton />;

  if (!otherUser || !activeChatId) return null;
  const handelDelete = async () => {
    deleteConversation(activeChatId, userId, otherUser.id);
  };

  return (
    <div className="flex w-full items-center justify-between border-b p-4">
      <Link
        href={`/profil/${otherUser?.username}`}
        className="flex items-center gap-3"
      >
        <ProfileAvatar className="size-8" image={otherUser?.image} />

        <Large>@{otherUser?.username}</Large>
      </Link>
      <div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Trash2 size={20} className="text-destructive cursor-pointer" />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Izbrisati razgovor?</AlertDialogTitle>
              <AlertDialogDescription>
                Ova radnja je nepovratna. Svi podaci i poruke iz ovog razgovora
                bit će trajno uklonjeni.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Odustani</AlertDialogCancel>
              <AlertDialogAction onClick={() => handelDelete()}>
                Da, izbriši
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
