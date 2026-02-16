import { get } from "http";

import { getAllApprovedWebsites } from "@/data/website";
import { parseExploreParams } from "@/lib/explore-params";

import { Container } from "@/components/layout/container";
import { WebsiteList } from "@/components/website-list/website-list";
import { GridToggle } from "@/components/website-list/website-list-navigation/grid-toggle";
import { OrderBySelect } from "@/components/website-list/website-list-navigation/select-filters";
import { WebsiteFilter } from "@/components/website-list/website-list-navigation/website-filter";
import { WebsiteListNavigation } from "@/components/website-list/website-list-navigation/website-list-navigation";

import Hero from "./_components/hero";

export default async function Home({ searchParams }: any) {
  const { category, style, colorStyle, primaryColor, technology, sort } =
    parseExploreParams(searchParams);
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
      <Hero className="my-20" />
      <WebsiteList
        websites={websiteResponse.data}
        error={websiteResponse.error}
      >
        <WebsiteListNavigation>
          <OrderBySelect />
          <WebsiteFilter />
          <GridToggle />
        </WebsiteListNavigation>
      </WebsiteList>
    </Container>
  );
}
