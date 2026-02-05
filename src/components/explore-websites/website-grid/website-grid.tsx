"use client";
import Image from "next/image";
import { AspectRatio } from "../../ui/aspect-ratio";
import { P } from "../../ui/typography";
import { WebsiteLikeButton } from "./website-grid-like";
import { WebsiteLink } from "./website-grid-link";
import { WebsiteFooter } from "./website-grid-footer";
import { WebsiteOverlay } from "./website-grid-overlay";
import { WebsiteWithExtras } from "@/data/websites";
import { useSearchParams } from "next/navigation";
import { ExploreHeader } from "../explore-header";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function WebsiteGrid({ userid, websites }: { userid?: string; websites: WebsiteWithExtras[] }) {
  const params = useSearchParams();
  const categoryParam = params.get("category");
  const styleParam = params.get("style");
  const [gridConfig, setGridConfig] = useState<"big" | "small">("big");
  const filteredWebsites = websites.filter((website) => {
    if (categoryParam && website.category !== categoryParam) return false;
    if (styleParam && website.style !== styleParam) return false;
    return true;
  });

  return (
    <>
      <ExploreHeader websitesNumber={filteredWebsites.length} gridConfig={gridConfig} setGridConfig={setGridConfig} />
      <div className={cn("grid gap-10", gridConfig === "big" ? "grid-cols-3" : "grid-cols-4")}>
        {filteredWebsites.map(({ id, name, url, imageUrl, user, likedBy, views }) => {
          const likedByAuth = likedBy.filter((like) => like.websiteId === id);

          return (
            <div key={id}>
              <AspectRatio ratio={8 / 6} className="relative bg-muted group ">
                <div className="absolute opacity-0 flex group-hover:opacity-200 gap-2 duration-100  bottom-4 right-3  text-white z-20">
                  <WebsiteLikeButton websiteId={id} likes={likedByAuth} userId={userid} />
                </div>
                <div className="absolute opacity-0 flex group-hover:opacity-200 gap-2 duration-100  bottom-5 left-4  text-white z-20">
                  <P>
                    <span className="text-xs">WEBSITE</span>
                    <span className="block text-lg leading-tight">{name}</span>
                  </P>
                </div>
                <WebsiteLink websiteId={id} websiteUrl={url}>
                  <WebsiteOverlay />
                  <Image src={imageUrl} alt="Preview" fill className="rounded-sm object-cover" />
                </WebsiteLink>
              </AspectRatio>
              <WebsiteFooter key={likedBy.length || views} author={user.name} avatar={user.image} views={views} likes={likedBy.length} />
            </div>
          );
        })}
      </div>
    </>
  );
}
