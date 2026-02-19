"use client";
import { useSearchParams } from "next/navigation";

import { cn } from "@lib/utils";

import { useUpdateQuery } from "@/hooks/use-update-query";

import { Button } from "@ui/button";

export function ProfileWebsitesTab({ className }: { className?: string }) {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const { updateQuery } = useUpdateQuery();

  return (
    <div className={cn("flex gap-1", className)}>
      <Button
        size="default"
        variant={tabParam === "projekti" || !tabParam ? "secondary" : "link"}
        onClick={() => updateQuery("tab", "projekti")}
      >
        Moji Projekti
      </Button>
      <Button
        size="default"
        variant={tabParam === "lajkano" ? "secondary" : "link"}
        onClick={() => updateQuery("tab", "lajkano")}
      >
        Lajkani Projekti
      </Button>
    </div>
  );
}
