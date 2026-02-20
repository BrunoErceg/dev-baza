import { notFound } from "next/navigation";

import { Container } from "@features/layout/components/container";
import { ProfileHero } from "@features/users/components/profile-hero/profile-hero";
import { getUser } from "@features/users/data";
import {
  WebsiteGridData,
  WebsiteGridWrapper,
} from "@features/websites/components/website-list/website-grid-data";
import { GridToggle } from "@features/websites/components/website-list/website-list-navigation/grid-toggle";
import { ProfileWebsitesTab } from "@features/websites/components/website-list/website-list-navigation/profile-websites-tab";
import { OrderBySelect } from "@features/websites/components/website-list/website-list-navigation/select-filters";
import { WebsiteListNavigation } from "@features/websites/components/website-list/website-list-navigation/website-list-navigation";
import { WebsiteListWrapper } from "@features/websites/components/website-list/website-list-wrapper";
import {
  getAllApprovedWebsites,
  getUserLikedWebsites,
} from "@features/websites/data";
import { parseExploreParams } from "@features/websites/utils";

export default async function Profile({
  params,
  searchParams,
}: {
  params: { username: string };
  searchParams: { tab: string };
}) {
  const { username } = await params;
  const { tab } = await searchParams;

  const resolvedParams = await searchParams;
  const filters = parseExploreParams(resolvedParams);
  const getUserWebsites = () => {
    return tab === "lajkano"
      ? getUserLikedWebsites(username, filters.sort)
      : getAllApprovedWebsites({ username, ...filters });
  };

  return (
    <Container>
      <ProfileHero username={username} className="my-10" />

      <WebsiteListWrapper>
        <WebsiteListNavigation>
          <OrderBySelect className="flex-1" />
          <ProfileWebsitesTab className="flex-1 justify-center" />
          <GridToggle className="flex-1" />
        </WebsiteListNavigation>

        <WebsiteGridWrapper>
          <WebsiteGridData getWebsites={() => getUserWebsites()} />
        </WebsiteGridWrapper>
      </WebsiteListWrapper>
    </Container>
  );
}
