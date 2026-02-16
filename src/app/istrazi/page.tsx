import { Category, ColorStyle } from "@prisma/client";

import { getAllApprovedWebsites } from "@/data/website";

import { Container } from "@/components/layout/container";
import { WebsiteList } from "@/components/website-list/website-list";
import { GridToggle } from "@/components/website-list/website-list-navigation/grid-toggle";
import {
  CategorySelect,
  ColorStyleSelect,
  OrderBySelect,
  PrimaryColorSelect,
  StyleSelect,
  TechnologySelect,
} from "@/components/website-list/website-list-navigation/select-filters";
import { WebsiteListNavigation } from "@/components/website-list/website-list-navigation/website-list-navigation";

export default async function Home({ searchParams }: any) {
  const param = await searchParams;
  const category = param["kategorija"] && param["kategorija"].toUpperCase();
  const style = param["stil"] && param["stil"].toUpperCase();
  const colorStyle =
    param["stil-dizajna"] && param["stil-dizajna"].toUpperCase();
  const primaryColor =
    param["primarna-boja"] && param["primarna-boja"].toUpperCase();
  const technology = param["tehnologija"] && param["tehnologija"].toUpperCase();
  const sort = param["poredaj-po"] && param["poredaj-po"];
  const websiteResponse = await getAllApprovedWebsites({
    category,
    style,
    colorStyle,
    primaryColor,
    technology,
    sort,
  });

  return (
    <Container>
      <WebsiteList
        websites={websiteResponse.data}
        error={websiteResponse.error}
      >
        <WebsiteListNavigation>
          <div className="flex gap-3">
            <CategorySelect />
            <StyleSelect />
            <ColorStyleSelect />
            <PrimaryColorSelect />
            <TechnologySelect />
          </div>

          <GridToggle />
        </WebsiteListNavigation>
      </WebsiteList>
    </Container>
  );
}
