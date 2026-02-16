"use client";
import { useRouter, useSearchParams } from "next/navigation";

import { CATEGORY_MAP } from "@/constants/mappings";

import { useUpdateQuery } from "@/hooks/use-update-query";

import { Button } from "@/components/ui/button";

export function WebsiteFilter() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("kategorija");
  const { updateQuery } = useUpdateQuery();

  return (
    <div className="flex gap-1">
      {Object.values(CATEGORY_MAP).map((category) => (
        <Button
          size="default"
          key={category.slug}
          variant={category.slug === categoryParam ? "secondary" : "link"}
          onClick={() => updateQuery("kategorija", category.slug)}
        >
          {category.label}
        </Button>
      ))}

      <Button
        size="default"
        variant={!categoryParam ? "secondary" : "link"}
        onClick={() => updateQuery("kategorija")}
      >
        Sve
      </Button>
    </div>
  );
}
