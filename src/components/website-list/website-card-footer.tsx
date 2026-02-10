import Link from "next/link";
import { IoEyeSharp } from "react-icons/io5";
import { VscHeartFilled } from "react-icons/vsc";

import { WebsiteWithUserAndLikes } from "@/types/websites";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Large, Muted } from "../ui/typography";

interface CardFooterProps {
  userName: string;
  userImage: string;
  likesCount: number;
  viewsCount: number;
}

export function WebsiteCardFooter({
  userName,
  userImage,
  likesCount,
  viewsCount,
}: CardFooterProps) {
  return (
    <div className="mt-2 flex justify-between">
      <Link href="/profile">
        <Large className="flex items-center gap-2">
          <Avatar size="sm">
            <AvatarImage src={userImage} alt="@shadcn" className="grayscale" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {userName}
        </Large>
      </Link>
      <div className="flex items-center gap-3 text-gray-400">
        <Muted className="flex items-center">
          <VscHeartFilled className="mr-1 inline-block" />
          {likesCount}
        </Muted>

        <Muted className="flex items-center">
          <IoEyeSharp className="mr-1 inline-block size-4.5" />
          {viewsCount}
        </Muted>
      </div>
    </div>
  );
}
