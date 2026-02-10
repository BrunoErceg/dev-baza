import { Dispatch, SetStateAction } from "react";

import { WebsiteWithUserAndLikes } from "@/types/websites";

import { P } from "../ui/typography";
import { WebsiteLink } from "./website-grid-link";

export function WebsiteCardOverlay({
  website,
  setViewsCount,
}: {
  website: WebsiteWithUserAndLikes;
  setViewsCount: Dispatch<SetStateAction<number>>;
}) {
  return (
    <WebsiteLink
      websiteId={website.id}
      websiteUrl={website.url}
      setViewsCount={setViewsCount}
    >
      <div className="absolute z-10 h-full w-full rounded-sm bg-linear-to-t from-black/60 to-transparent opacity-0 duration-200 group-hover:opacity-100">
        <div className="absolute bottom-5 left-4 z-20 flex gap-2 text-white opacity-0 duration-100 group-hover:opacity-200">
          <P>
            <span className="text-xs">WEBSITE</span>
            <span className="block text-lg leading-tight">{website.name}</span>
          </P>
        </div>
      </div>
    </WebsiteLink>
  );
}
