"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { VscHeart } from "react-icons/vsc";
import { VscHeartFilled } from "react-icons/vsc";

import { createLike, deleteLike } from "@/actions/like-action";
import { Like } from "@prisma/client";

import { useWebsites } from "@/context/websites-context";

import { Button } from "../ui/button";
import { WebsiteDialog } from "./website-dialog";

interface LikeButtonProps {
  websiteId: string;
  likes: Like[];
  setLikesCount: Dispatch<SetStateAction<number>>;
}

export function WebsiteLikeButton({
  websiteId,
  likes,
  setLikesCount,
}: LikeButtonProps) {
  const { userId } = useWebsites();
  const router = useRouter();
  const userLiked = likes.some((like) => like.userId === userId);
  const [isLiked, setIsLiked] = useState(userLiked);

  const toggleLike = async () => {
    if (!userId) return;
    const prevLike = isLiked;
    setLikesCount((prev) => (prevLike ? prev - 1 : prev + 1));
    setIsLiked(!prevLike);
    const results = !prevLike
      ? await createLike(websiteId)
      : await deleteLike(websiteId);

    if (!results.success) {
      setIsLiked(prevLike);
      setLikesCount((prev) => (prevLike ? prev + 1 : prev - 1));
    }
    router.refresh();
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
