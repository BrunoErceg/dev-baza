"use client";

import { useWebsites } from "@/context/websites-context";
import { cn } from "@/lib/utils";
import { GridWebsiteData } from "@/types/websites";

import { WebsiteCard } from "./website-card/website-card";

export function WebsiteGrid({ websites }: { websites: GridWebsiteData[] }) {
  const { gridConfig } = useWebsites();

  return (
    <div
      className={cn(
        "grid gap-10",
        gridConfig === "big" ? "grid-cols-3" : "grid-cols-4",
      )}
    >
      {websites.map((website) => (
        <WebsiteCard key={website.id} website={website} />
      ))}
    </div>
  );
}
