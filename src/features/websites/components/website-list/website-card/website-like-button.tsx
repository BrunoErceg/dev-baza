"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { VscHeart } from "react-icons/vsc";
import { VscHeartFilled } from "react-icons/vsc";

import { Like } from "@prisma/client";
import { toast } from "sonner";
import { set } from "zod";

import { createLike, deleteLike } from "@features/websites/actions";
import { useWebsites } from "@features/websites/websites-context";

import { Button } from "@ui/button";

import { WebsiteDialog } from "./website-dialog";

interface LikeButtonProps {
  websiteId: string;
  likes: Like[];
  onLike: Dispatch<SetStateAction<number>>;
}

export function WebsiteLikeButton({
  websiteId,
  likes,
  onLike,
}: LikeButtonProps) {
  const { userId } = useWebsites();
  const router = useRouter();
  const userLiked = likes.some((like) => like.userId === userId);
  const [isLiked, setIsLiked] = useState(userLiked);

  const toggleLike = async () => {
    if (!userId) return;
    if (isLiked) {
      setIsLiked(false);
      onLike((prev) => prev - 1);
      const { error } = await deleteLike(websiteId);
      if (error) {
        setIsLiked(true);
        onLike((prev) => prev + 1);
        toast.error(error);
      }
    } else {
      setIsLiked(true);
      onLike((prev) => prev + 1);
      const { error } = await createLike(websiteId);
      if (error) {
        setIsLiked(false);
        onLike((prev) => prev - 1);
        toast.error(error);
      }
    }
  };

  return (
    <div className="absolute right-3 bottom-4 z-20 flex gap-2 text-white opacity-0 duration-100 group-hover:opacity-100">
      {!userId ? (
        <WebsiteDialog
          cta={<VscHeart className="size-7 cursor-pointer" />}
          title="Potrebna prijava!"
          description="Morate biti prijavljeni kako biste označili stranice koje vam se
                sviđaju."
        >
          <Button asChild className="ml-auto w-fit">
            <Link href="/prijava">Prijavi se</Link>
          </Button>
        </WebsiteDialog>
      ) : (
        <button onClick={() => toggleLike()}>
          {!isLiked ? (
            <VscHeart className="size-7 cursor-pointer" />
          ) : (
            <VscHeartFilled className="size-7 cursor-pointer" />
          )}
        </button>
      )}
    </div>
  );
}
