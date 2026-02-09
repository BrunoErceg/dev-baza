import { ExploreWebsites } from "@/components/explore-websites/explore-websites";
import { Container } from "@/components/layout/container";
import { cookies } from "next/headers";

export default async function Home() {
  return (
    <Container>
      <ExploreWebsites></ExploreWebsites>
    </Container>
  );
}
