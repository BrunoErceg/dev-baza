import {
  Category,
  ColorStyle,
  PrimaryColor,
  Style,
  Technology,
} from "@prisma/client";

export function parseExploreParams(
  params: Record<string, string | string[] | undefined>,
) {
  const normalize = (val: any) =>
    typeof val === "string"
      ? val.replace(/-/g, " ").trim().toUpperCase()
      : undefined;

  return {
    category: normalize(params["kategorija"]) as Category | undefined, // fix later all as | undefine
    style: normalize(params["stil"]) as Style | undefined,
    colorStyle: normalize(params["stil-dizajna"]) as ColorStyle | undefined,
    primaryColor: normalize(params["primarna-boja"]) as
      | PrimaryColor
      | undefined,
    technology: normalize(params["tehnologija"]) as Technology | undefined,
    sort:
      typeof params["poredaj-po"] === "string"
        ? params["poredaj-po"]
        : undefined,
  };
}
