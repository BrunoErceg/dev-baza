"use client";
import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";
import { P } from "../ui/typography";
import { WebsiteLikeButton } from "./website-grid-like";
import { WebsiteLink } from "./website-grid-link";
import { WebsiteFooter } from "./website-grid-footer";
import { WebsiteOverlay } from "./website-grid-overlay";
import { WebsiteWithExtras } from "@/data/websites";
import { useSearchParams } from "next/navigation";
import { useContext, useMemo } from "react";
import { cn } from "@/lib/utils";
import { ExploreContext } from "@/context/explore-context";
export function WebsiteGrid({
  userid,
  websites,
}: {
  userid?: string;
  websites: WebsiteWithExtras[];
}) {
  const { gridConfig } = useContext(ExploreContext);
  const params = useSearchParams();
  const categoryParam = params.get("category");
  const orderByParam = params.get("orderBy");

  const processedWebsites = useMemo(() => {
    let items = websites.filter((website) => {
      if (categoryParam && website.category !== categoryParam) return false;
      return true;
    });
    if (orderByParam) {
      if (orderByParam === "Datum")
        return items.sort(
          (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
        );

      if (orderByParam === "Lajkovi")
        return items.sort((a, b) => b.likedBy.length - a.likedBy.length);
      if (orderByParam === "Pregledi")
        return items.sort((a, b) => b.views - a.views);
    }

    return items;
  }, [websites, categoryParam, orderByParam]);

  return (
    <div
      className={cn(
        "grid gap-10",
        gridConfig === "big" ? "grid-cols-3" : "grid-cols-4",
      )}
    >
      {processedWebsites.map(
        ({ id, name, url, imageUrl, user, likedBy, views }) => {
          const likedByAuth = likedBy.filter((like) => like.websiteId === id);

          return (
            <div key={id}>
              <AspectRatio ratio={8 / 6} className="relative bg-muted group ">
                <div className="absolute opacity-0 flex group-hover:opacity-200 gap-2 duration-100  bottom-4 right-3  text-white z-20">
                  <WebsiteLikeButton
                    websiteId={id}
                    likes={likedByAuth}
                    userId={userid}
                  />
                </div>
                <div className="absolute opacity-0 flex group-hover:opacity-200 gap-2 duration-100  bottom-5 left-4  text-white z-20">
                  <P>
                    <span className="text-xs">WEBSITE</span>
                    <span className="block text-lg leading-tight">{name}</span>
                  </P>
                </div>

                <WebsiteLink websiteId={id} websiteUrl={url}>
                  <WebsiteOverlay />
                  <Image
                    src={imageUrl}
                    alt="Preview"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="rounded-sm object-cover"
                  />
                </WebsiteLink>
              </AspectRatio>
              <WebsiteFooter
                key={likedBy.length || views}
                author={user.name}
                avatar={user.image}
                views={views}
                likes={likedBy.length}
              />
            </div>
          );
        },
      )}
    </div>
  );
}
