import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { VscHeartFilled } from "react-icons/vsc";

import { WebsiteAdminDropdown } from "@features/admin/components/website-admin-dropdown/website-admin-dropdown";
import { ProfileAvatar } from "@features/users/components/profile-avatar";
import { GridWebsiteData } from "@features/websites/types";

import { AspectRatio } from "@ui/aspect-ratio";
import { Badge } from "@ui/badge";
import { Large, Muted, P } from "@ui/typography";

import { WebsiteLikeButton } from "./website-like-button";
import { WebsiteLink } from "./website-link";

interface WebsiteCardProps {
  website: GridWebsiteData;
  isAdmin: boolean;
}

export function WebsiteCard({ website, isAdmin }: WebsiteCardProps) {
  const { id, name, url, award, imageUrl, user, views, likedBy } = website;
  const [likes, setLikes] = useState(website.likedBy.length);
  return (
    <div>
      <AspectRatio ratio={8 / 6} className="group relative">
        <WebsiteLink url={url} id={id}>
          <div className="absolute z-10 h-full w-full rounded-sm bg-linear-to-t from-black/60 to-transparent opacity-0 duration-200 group-hover:opacity-100" />
        </WebsiteLink>

        {isAdmin && (
          <WebsiteAdminDropdown websiteAward={award} websiteId={id} />
        )}

        {award && (
          <Badge className="absolute top-2 right-2 z-20">🏆 {award}</Badge>
        )}

        <div className="absolute bottom-5 left-4 z-20 flex gap-2 text-white opacity-0 duration-100 group-hover:opacity-200">
          <P className="text-white">
            <span className="text-xs">WEBSITE</span>
            <span className="block text-lg leading-tight">{name}</span>
          </P>
        </div>
        <WebsiteLikeButton websiteId={id} likes={likedBy} onLike={setLikes} />

        <Image
          src={imageUrl}
          alt="Preview"
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="h-full w-full rounded-sm object-cover"
        />
      </AspectRatio>

      <footer className="mt-2 flex justify-between">
        <Link
          href={`/profil/${user.username}`}
          className="flex items-center gap-2"
        >
          <ProfileAvatar image={user.image} className="size-5" />
          <Large>{user.username}</Large>
        </Link>
        <div className="flex items-center gap-3 text-gray-400">
          <Muted className="flex items-center">
            <VscHeartFilled className="mr-1 inline-block" />
            {likes}
          </Muted>

          <Muted className="flex items-center">
            <IoEyeSharp className="mr-1 inline-block size-4.5" />
            {views}
          </Muted>
        </div>
      </footer>
    </div>
  );
}
