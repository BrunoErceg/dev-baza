import { Container } from "@features/layout/components/container";
import { WebsiteList } from "@features/websites/components/website-list/website-list";
import { GridToggle } from "@features/websites/components/website-list/website-list-navigation/grid-toggle";
import {
  CategorySelect,
  ColorStyleSelect,
  PrimaryColorSelect,
  StyleSelect,
  TechnologySelect,
} from "@features/websites/components/website-list/website-list-navigation/select-filters";
import { WebsiteListNavigation } from "@features/websites/components/website-list/website-list-navigation/website-list-navigation";
import { getAllApprovedWebsites } from "@features/websites/data";
import { parseExploreParams } from "@features/websites/utils";

export default async function Home({ searchParams }: any) {
  const resolvedParams = await searchParams;
  const filters = parseExploreParams(resolvedParams);
  const websiteResponse = await getAllApprovedWebsites({ ...filters });

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
