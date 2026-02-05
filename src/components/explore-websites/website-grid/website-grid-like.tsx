"use client";
import { createLike } from "@/actions/create-like";
import { deleteLike } from "@/actions/delete-like";
import { Like } from "@prisma/client";
import { useState } from "react";
import { VscHeart } from "react-icons/vsc";
import { VscHeartFilled } from "react-icons/vsc";
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
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
export function WebsiteLikeButton({ websiteId, likes, userId }: { websiteId: string; likes: Like[]; userId?: string }) {
  const isAuth = userId === undefined ? false : true;
  const router = useRouter();
  const userLiked = likes.filter((like) => like.userId === userId).length > 0 ? true : false;
  const [isLiked, setIsLiked] = useState(userLiked);
  const handelLike = async (websiteId: string) => {
    if (!isLiked) {
      const results = await createLike(websiteId);
      if (results.success) {
        setIsLiked(true);
        router.refresh();
      }
    } else {
      const results = await deleteLike(websiteId);
      if (results.success) {
        setIsLiked(false);
        router.refresh();
      }
    }
  };
  return (
    <button onClick={() => handelLike(websiteId)}>
      {!isAuth ? (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <VscHeart className="size-7 cursor-pointer" />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : isLiked ? (
        <VscHeartFilled className="size-7 cursor-pointer" />
      ) : (
        <VscHeart className="size-7 cursor-pointer" />
      )}
    </button>
  );
}
