"use client";
import { Category } from "@prisma/client";

import { Button } from "../ui/button";
import { useSearchParams, useRouter } from "next/navigation";

export function WebsiteFilters() {
  const router = useRouter();
  const categories = Object.values(Category);
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
      {categories.map((category) => (
        <Button
          key={category}
          variant={category === categoryParam ? "default" : "link"}
          onClick={() => changeCategory(category)}
        >
          {category}
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
