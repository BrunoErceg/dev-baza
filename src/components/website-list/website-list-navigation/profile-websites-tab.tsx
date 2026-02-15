"use client";
import { useSearchParams } from "next/navigation";

import { useUpdateQuery } from "@/hooks/use-update-query";

import { Button } from "@/components/ui/button";

export function ProfileWebsitesTab() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const { updateQuery } = useUpdateQuery();

  return (
    <div className="flex gap-1">
      <Button
        variant={tabParam === "projekti" || !tabParam ? "outline" : "link"}
        onClick={() => updateQuery("tab", "projekti")}
      >
        Moji Projekti
      </Button>
      <Button
        variant={tabParam === "lajkano" ? "outline" : "link"}
        onClick={() => updateQuery("tab", "lajkano")}
      >
        Lajkani Projekti
      </Button>
    </div>
  );
}
