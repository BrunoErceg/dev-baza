import { Container } from "@features/layout/components/container";
import {
  WebsiteGridData,
  WebsiteGridWrapper,
} from "@features/websites/components/website-list/website-grid-data";
import { GridToggle } from "@features/websites/components/website-list/website-list-navigation/grid-toggle";
import { OrderBySelect } from "@features/websites/components/website-list/website-list-navigation/select-filters";
import { WebsiteCategoryList } from "@features/websites/components/website-list/website-list-navigation/website-category-list";
import { WebsiteListNavigation } from "@features/websites/components/website-list/website-list-navigation/website-list-navigation";
import { WebsiteListWrapper } from "@features/websites/components/website-list/website-list-wrapper";
import { getAllApprovedWebsites } from "@features/websites/data";
import { parseExploreParams } from "@features/websites/utils";

import Hero from "../../features/marketing/components/hero";

export default async function Home({ searchParams }: any) {
  const resolvedParams = await searchParams;
  const filters = parseExploreParams(resolvedParams);

  return (
    <Container>
      <Hero className="my-20" />

      <WebsiteListWrapper>
        <WebsiteListNavigation>
          <OrderBySelect className="flex-1" />
          <WebsiteCategoryList className="flex-1" />
          <GridToggle className="flex-1" />
        </WebsiteListNavigation>

        <WebsiteGridWrapper>
          <WebsiteGridData
            getWebsites={() => getAllApprovedWebsites({ ...filters })}
          />
        </WebsiteGridWrapper>
      </WebsiteListWrapper>
    </Container>
  );
}
