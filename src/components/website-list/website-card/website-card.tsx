import Image from "next/image";
import Link from "next/link";
import { IoEyeSharp } from "react-icons/io5";
import { VscHeartFilled } from "react-icons/vsc";

import { GridWebsiteData } from "@/types/websites";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Large, Muted, P } from "@/components/ui/typography";

import { WebsiteAdminDropdown } from "./website-admin-dropdown";
import { WebsiteLikeButton } from "./website-like-button";
import { WebsiteLink } from "./website-link";

const HoverOverlay = ({
  url,
  id,
  children,
}: {
  url: string;
  id: string;
  children: React.ReactNode;
}) => {
  return (
    <>
      <WebsiteLink url={url} id={id}>
        <div className="absolute z-10 h-full w-full rounded-sm bg-linear-to-t from-black/60 to-transparent opacity-0 duration-200 group-hover:opacity-100" />
      </WebsiteLink>
      {children}
    </>
  );
};

const AwardBadge = ({ title }: { title: string }) => {
  return <Badge className="absolute top-2 right-2 z-20">🏆 {title}</Badge>;
};

function WebsiteUser({
  user,
}: {
  user: { name: string; image: string; id: string };
}) {
  return (
    <Link href={`/profil/${user.id}`}>
      <Large className="flex items-center gap-2">
        <Avatar size="sm">
          <AvatarImage src={user.image} alt="@shadcn" className="grayscale" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        {user.name}
      </Large>
    </Link>
  );
}

const CardContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <AspectRatio ratio={8 / 6} className="bg-muted group relative">
      {children}
    </AspectRatio>
  );
};

const LikesAndViews = ({
  stats,
}: {
  stats: { likes: number; views: number };
}) => {
  return (
    <div className="flex items-center gap-3 text-gray-400">
      <Muted className="flex items-center">
        <VscHeartFilled className="mr-1 inline-block" />
        {stats.likes}
      </Muted>

      <Muted className="flex items-center">
        <IoEyeSharp className="mr-1 inline-block size-4.5" />
        {stats.views}
      </Muted>
    </div>
  );
};

const WebsiteName = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="absolute bottom-5 left-4 z-20 flex gap-2 text-white opacity-0 duration-100 group-hover:opacity-200">
      <P>
        <span className="text-xs">WEBSITE</span>
        <span className="block text-lg leading-tight">{children}</span>
      </P>
    </div>
  );
};

const WebsiteImage = ({ url }: { url: string }) => {
  return (
    <Image
      src={url}
      alt="Preview"
      fill
      priority
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className="rounded-sm object-cover"
    />
  );
};

export function WebsiteCard({ website }: { website: GridWebsiteData }) {
  const { id, name, url, award, imageUrl, user, views, likedBy } = website;

  return (
    <div>
      <CardContent>
        <HoverOverlay url={url} id={id}>
          <WebsiteAdminDropdown websiteAward={award} websiteId={id} />
          {award && <AwardBadge title={award} />}
          <WebsiteName>{name}</WebsiteName>
          <WebsiteLikeButton websiteId={id} likes={likedBy} />
        </HoverOverlay>

        <WebsiteImage url={imageUrl} />
      </CardContent>

      <footer className="mt-2 flex justify-between">
        <WebsiteUser user={user} />
        <LikesAndViews stats={{ likes: likedBy.length, views }} />
      </footer>
    </div>
  );
}
