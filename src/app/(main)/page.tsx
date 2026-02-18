import { Container } from "@features/layout/components/container";
import { WebsiteList } from "@features/websites/components/website-list/website-list";
import { GridToggle } from "@features/websites/components/website-list/website-list-navigation/grid-toggle";
import { OrderBySelect } from "@features/websites/components/website-list/website-list-navigation/select-filters";
import { WebsiteCategoryList } from "@features/websites/components/website-list/website-list-navigation/website-category-list";
import { WebsiteListNavigation } from "@features/websites/components/website-list/website-list-navigation/website-list-navigation";
import { getAllApprovedWebsites } from "@features/websites/data";
import { parseExploreParams } from "@features/websites/utils";

import Hero from "../../features/marketing/components/hero";

export default async function Home({ searchParams }: any) {
  const resolvedParams = await searchParams;
  const filters = parseExploreParams(resolvedParams);
  const websiteResponse = await getAllApprovedWebsites({ ...filters });

  return (
    <Container>
      <Hero className="my-20" />
      <WebsiteList
        websites={websiteResponse.data}
        error={websiteResponse.error}
      >
        <WebsiteListNavigation>
          <OrderBySelect />
          <WebsiteCategoryList />
          <GridToggle />
        </WebsiteListNavigation>
      </WebsiteList>
    </Container>
  );
}
