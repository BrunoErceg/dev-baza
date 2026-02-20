import { Container } from "@features/layout/components/container";
import {
  WebsiteGridData,
  WebsiteGridWrapper,
} from "@features/websites/components/website-list/website-grid-data";
import { GridToggle } from "@features/websites/components/website-list/website-list-navigation/grid-toggle";
import {
  CategorySelect,
  ColorStyleSelect,
  StyleSelect,
  TechnologySelect,
} from "@features/websites/components/website-list/website-list-navigation/select-filters";
import { WebsiteListNavigation } from "@features/websites/components/website-list/website-list-navigation/website-list-navigation";
import { WebsiteListWrapper } from "@features/websites/components/website-list/website-list-wrapper";
import { getAllApprovedWebsites } from "@features/websites/data";
import { parseExploreParams } from "@features/websites/utils";

export default async function Home({ searchParams }: any) {
  const resolvedParams = await searchParams;
  const filters = parseExploreParams(resolvedParams);

  return (
    <Container>
      <WebsiteListWrapper>
        <WebsiteListNavigation>
          <div className="flex gap-3">
            <CategorySelect />
            <StyleSelect />
            <ColorStyleSelect />
            <TechnologySelect />
          </div>
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
