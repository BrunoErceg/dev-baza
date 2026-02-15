import { getAllApprovedWebsites } from "@/data/website";

import { Container } from "@/components/layout/container";
import { WebsiteList } from "@/components/website-list/website-list";
import { GridToggle } from "@/components/website-list/website-list-navigation/grid-toggle";
import { WebsiteFilter } from "@/components/website-list/website-list-navigation/website-filter";
import { WebsiteListNavigation } from "@/components/website-list/website-list-navigation/website-list-navigation";
import { WebsiteSortSelect } from "@/components/website-list/website-list-navigation/website-sort-select";

import Hero from "./_components/hero";

export default async function Home() {
  const websiteResponse = await getAllApprovedWebsites();

  return (
    <Container>
      <Hero className="my-12" />
      <WebsiteList
        websites={websiteResponse.data}
        error={websiteResponse.error}
      >
        <WebsiteListNavigation>
          <WebsiteSortSelect />
          <WebsiteFilter />
          <GridToggle />
        </WebsiteListNavigation>
      </WebsiteList>
    </Container>
  );
}
