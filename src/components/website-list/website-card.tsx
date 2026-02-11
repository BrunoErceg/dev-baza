import Image from "next/image";
import { useState } from "react";

import { Award } from "lucide-react";

import { WebsiteWithUserAndLikes } from "@/types/websites";

import { AspectRatio } from "../ui/aspect-ratio";
import { Badge } from "../ui/badge";
import { WebsiteAdminDropdown } from "./website-admin-dropdown";
import { WebsiteCardFooter } from "./website-card-footer";
import { WebsiteCardOverlay } from "./website-card-overlay";
import { WebsiteLikeButton } from "./website-like-button";

export function WebsiteCard({ website }: { website: WebsiteWithUserAndLikes }) {
  const [likesCount, setLikesCount] = useState(website.likedBy.length);
  const [viewsCount, setViewsCount] = useState(website.views);
  return (
    <div>
      <AspectRatio ratio={8 / 6} className="bg-muted group relative">
        <WebsiteAdminDropdown
          websiteAward={website.award}
          websiteId={website.id}
        />
        <WebsiteCardOverlay website={website} setViewsCount={setViewsCount} />
        {website.award && (
          <Badge className="absolute top-2 right-2 z-20">
            🏆 {website.award}
          </Badge>
        )}

        <WebsiteLikeButton
          websiteId={website.id}
          likes={website.likedBy}
          setLikesCount={setLikesCount}
        />

        <Image
          src={website.imageUrl}
          alt="Preview"
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="rounded-sm object-cover"
        />
      </AspectRatio>

      <WebsiteCardFooter
        userName={website.user.name}
        userImage={website.user.image}
        likesCount={likesCount}
        viewsCount={viewsCount}
      />
    </div>
  );
}
