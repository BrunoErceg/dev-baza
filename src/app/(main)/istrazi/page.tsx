import { Container } from "@features/layout/components/container";
import {
  WebsiteGridData,
  WebsiteGridWrapper,
} from "@features/websites/components/website-list/website-grid-data";
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

import { H1, P } from "@ui/typography";

export const metadata = {
  title: "Istraživanje",
};

export default async function Home({ searchParams }: any) {
  const resolvedParams = await searchParams;
  const filters = parseExploreParams(resolvedParams);

  return (
    <Container>
      <div className="mb-8 flex flex-col items-center text-center">
        <H1>Kreni u istraživanje</H1>
        <P>Pretraži, filtriraj i otkrij ono što te zanima.</P>
      </div>
      <WebsiteListWrapper>
        <WebsiteListNavigation>
          <CategorySelect />
          <StyleSelect />
          <ColorStyleSelect />
          <TechnologySelect />
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
