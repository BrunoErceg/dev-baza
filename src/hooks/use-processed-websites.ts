import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

import { Category } from "@prisma/client";

import { OrderByOption, WebsiteWithUserAndLikes } from "@/types/websites";

/**
 * Filters and sorts websites based on URL query parameters.
 */
export function useProcessedWebsites({
  websites,
}: {
  websites: WebsiteWithUserAndLikes[];
}) {
  const params = useSearchParams();
  const categoryParam = params.get("category") as Category | undefined;
  const orderByParam = params.get("orderBy") as OrderByOption | undefined;

  return useMemo(() => {
    let items = websites.filter((website) => {
      if (categoryParam && website.category !== categoryParam) return false;
      return true;
    });
    if (orderByParam) {
      if (orderByParam === "Datum")
        return items.sort(
          (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
        );

      if (orderByParam === "Lajkovi")
        return items.sort((a, b) => b.likedBy.length - a.likedBy.length);
      if (orderByParam === "Pregledi")
        return items.sort((a, b) => b.views - a.views);
    }

    return items;
  }, [websites, categoryParam, orderByParam]);
}
