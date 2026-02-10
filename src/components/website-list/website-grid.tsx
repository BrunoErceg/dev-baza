"use client";

import { useWebsites } from "@/context/websites-context";
import { useProcessedWebsites } from "@/hooks/use-processed-websites";
import { cn } from "@/lib/utils";
import { WebsiteWithUserAndLikes } from "@/types/websites";

import { WebsiteCard } from "./website-card";

export function WebsiteGrid({
  websites,
}: {
  websites: WebsiteWithUserAndLikes[];
}) {
  const { gridConfig } = useWebsites();
  const processedWebsites = useProcessedWebsites({ websites });

  return (
    <div
      className={cn(
        "grid gap-10",
        gridConfig === "big" ? "grid-cols-3" : "grid-cols-4",
      )}
    >
      {processedWebsites.map((website) => (
        <WebsiteCard key={website.id} website={website} />
      ))}
    </div>
  );
}
