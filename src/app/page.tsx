import { Container } from "@/components/layout/container";
import { WebsitesList } from "@/components/website-list/website-list";

export default async function Home() {
  return (
    <Container>
      <WebsitesList />
    </Container>
  );
}
