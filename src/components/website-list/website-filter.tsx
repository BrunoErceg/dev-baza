"use client";
import { useRouter, useSearchParams } from "next/navigation";

import { CATEGORY_MAP } from "@/constants/categories";

import { Button } from "../ui/button";

export function WebsiteFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const changeCategory = (value?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("category", value);
    } else {
      params.delete("category");
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex gap-1">
      {Object.values(CATEGORY_MAP).map((category) => (
        <Button
          key={category.slug}
          variant={category.slug === categoryParam ? "default" : "link"}
          onClick={() => changeCategory(category.slug)}
        >
          {category.label}
        </Button>
      ))}

      <Button
        variant={!categoryParam ? "default" : "link"}
        onClick={() => changeCategory()}
      >
        Sve
      </Button>
    </div>
  );
}
