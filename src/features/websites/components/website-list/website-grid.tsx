"use client";
import { useSession } from "next-auth/react";

import { GridWebsiteData } from "@features/websites/types";
import { useWebsites } from "@features/websites/websites-context";

import { cn } from "@/lib/utils";

import { WebsiteCard } from "./website-card/website-card";

export function WebsiteGrid({ websites }: { websites: GridWebsiteData[] }) {
  const { gridConfig } = useWebsites();
  const { data: session } = useSession();
  const isAdmin = (session?.user as any)?.role === "ADMIN";
  return (
    <div
      className={cn(
        "grid gap-10",
        gridConfig === "big" ? "grid-cols-3" : "grid-cols-4",
      )}
    >
      {websites.map((website) => (
        <WebsiteCard key={website.id} website={website} isAdmin={isAdmin} />
      ))}
    </div>
  );
}
