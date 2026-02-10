import { Container } from "@/components/layout/container";
import { WebsitesList } from "@/components/website-list/website-list";

import Hero from "./_components/hero";

export default async function Home() {
  return (
    <Container>
      <Hero className="my-12" />
      <WebsitesList />
    </Container>
  );
}
