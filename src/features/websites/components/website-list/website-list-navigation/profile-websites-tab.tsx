"use client";
import { useSearchParams } from "next/navigation";

import { cn } from "@lib/utils";
import { Delete } from "lucide-react";
import { map } from "zod";

import { useUpdateQuery } from "@/hooks/use-update-query";

import { Button } from "@ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui/select";

import { UserWebsitesTabSelect } from "./select-filters";

export function ProfileWebsitesTab({ className }: { className?: string }) {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const { updateQuery } = useUpdateQuery();

  return (
    <>
      <div className={cn("hidden gap-1 md:flex", className)}>
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
      <UserWebsitesTabSelect className="md:hidden" />
    </>
  );
}
