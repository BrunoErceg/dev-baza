"use client";

import { useWebsites } from "@/context/websites-context";
import { useProcessedWebsites } from "@/hooks/use-processed-websites";
import { cn } from "@/lib/utils";
import { GridWebsiteData } from "@/types/websites";

import { WebsiteCard } from "./website-card/website-card";

export function WebsiteGrid({ websites }: { websites: GridWebsiteData[] }) {
  const { gridConfig } = useWebsites();
  const processedWebsites = websites && useProcessedWebsites({ websites });

  return (
    <div
      className={cn(
        "grid gap-10",
        gridConfig === "big" ? "grid-cols-3" : "grid-cols-4",
      )}
    >
      {processedWebsites &&
        processedWebsites.map((website) => (
          <WebsiteCard key={website.id} website={website} />
        ))}
    </div>
  );
}
