import { notFound } from "next/navigation";

import { Container } from "@features/layout/components/container";
import { ProfileHero } from "@features/user/components/profile-hero/profile-hero";
import { getUser } from "@features/user/data";
import { WebsiteList } from "@features/websites/components/website-list/website-list";
import { GridToggle } from "@features/websites/components/website-list/website-list-navigation/grid-toggle";
import { ProfileWebsitesTab } from "@features/websites/components/website-list/website-list-navigation/profile-websites-tab";
import { OrderBySelect } from "@features/websites/components/website-list/website-list-navigation/select-filters";
import { WebsiteListNavigation } from "@features/websites/components/website-list/website-list-navigation/website-list-navigation";
import {
  getAllApprovedWebsites,
  getUserLikedWebsites,
} from "@features/websites/data";
import { parseExploreParams } from "@features/websites/utils";

export default async function Profile({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { tab: string };
}) {
  const { id } = await params;
  const { tab } = await searchParams;
  const { data: user, error: userError } = await getUser(id);
  const resolvedParams = await searchParams;
  const filters = parseExploreParams(resolvedParams);
  const websiteResponse =
    tab === "lajkano"
      ? await getUserLikedWebsites(id)
      : await getAllApprovedWebsites({ userId: id, ...filters });
  if (!user || userError) notFound();

  return (
    <Container>
      <ProfileHero user={user} className="my-10" />
      <WebsiteList
        websites={websiteResponse.data}
        error={websiteResponse.error}
      >
        <WebsiteListNavigation>
          <OrderBySelect />
          <ProfileWebsitesTab />
          <GridToggle />
        </WebsiteListNavigation>
      </WebsiteList>
    </Container>
  );
}
