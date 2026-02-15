import { notFound } from "next/navigation";

import { getUser } from "@/data/user";
import { getUserLikedWebsites, getUserWebsites } from "@/data/website";

import { Container } from "@/components/layout/container";
import { WebsiteList } from "@/components/website-list/website-list";
import { GridToggle } from "@/components/website-list/website-list-navigation/grid-toggle";
import { ProfileWebsitesTab } from "@/components/website-list/website-list-navigation/profile-websites-tab";
import { WebsiteListNavigation } from "@/components/website-list/website-list-navigation/website-list-navigation";
import { WebsiteSortSelect } from "@/components/website-list/website-list-navigation/website-sort-select";

import { ProfileHero } from "./_components/profile-hero";

export default async function Profile({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { tab: string };
}) {
  const { id } = await params;
  const { tab } = await searchParams;
  const user = await getUser(id);
  const websiteResponse =
    tab === "lajkano"
      ? await getUserLikedWebsites(id)
      : await getUserWebsites(id);
  if (!user) notFound();

  return (
    <Container>
      <ProfileHero user={user} className="my-10" />
      <WebsiteList
        websites={websiteResponse.data}
        error={websiteResponse.error}
      >
        <WebsiteListNavigation>
          <WebsiteSortSelect />
          <ProfileWebsitesTab />
          <GridToggle />
        </WebsiteListNavigation>
      </WebsiteList>
    </Container>
  );
}
