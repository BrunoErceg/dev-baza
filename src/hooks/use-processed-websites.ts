import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

import { CATEGORY_MAP } from "@/constants/categories";

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
  const categoryParam = params.get("category");
  const orderByParam = params.get("orderBy") as OrderByOption | undefined;
  const categoryKey = Object.entries(CATEGORY_MAP).find(
    ([, v]) => v.slug === categoryParam,
  )?.[0];

  return useMemo(() => {
    let items = websites.filter((website) => {
      if (categoryKey && website.category !== categoryKey) return false;
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
