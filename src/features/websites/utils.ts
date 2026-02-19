import { Category, ColorStyle, Style, Technology } from "@prisma/client";

import {
  CATEGORY_MAP,
  COLOR_STYLE_MAP,
  STYLE_MAP,
  TECH_MAP,
} from "./constants";

export function parseExploreParams(
  params: Record<string, string | string[] | undefined>,
) {
  const findKey = (map: Record<string, { slug: string }>, paramKey: string) => {
    const slug = params[paramKey];
    if (typeof slug !== "string") return undefined;

    return Object.entries(map).find(
      ([_, value]) => value.slug === slug.toLowerCase(),
    )?.[0];
  };

  return {
    category: findKey(CATEGORY_MAP, "kategorija") as Category | undefined,
    style: findKey(STYLE_MAP, "stil") as Style | undefined,
    colorStyle: findKey(COLOR_STYLE_MAP, "stil-boja") as ColorStyle | undefined,
    technology: findKey(TECH_MAP, "tehnologija") as Technology | undefined,
    sort:
      typeof params["poredaj-po"] === "string"
        ? params["poredaj-po"]
        : undefined,
  };
}
