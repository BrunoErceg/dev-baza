import { Large, Muted } from "../../ui/typography";
import { IoEyeSharp } from "react-icons/io5";
import { VscHeartFilled } from "react-icons/vsc";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import Link from "next/link";

export function WebsiteFooter({ author, avatar, likes, views }: { author: string; avatar: string; likes: number; views: number }) {
  return (
    <div className="flex mt-2 justify-between">
      <Link href="/profile">
        <Large className="flex items-center gap-2 ">
          <Avatar size="sm">
            <AvatarImage src={avatar} alt="@shadcn" className="grayscale" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {author}
        </Large>
      </Link>
      <div className="flex items-center gap-3 text-gray-400">
        <Muted className="flex items-center">
          <VscHeartFilled className="inline-block mr-1" />
          {likes}
        </Muted>

        <Muted className="flex items-center">
          <IoEyeSharp className="inline-block mr-1 size-4.5" />
          {views}
        </Muted>
      </div>
    </div>
  );
}
