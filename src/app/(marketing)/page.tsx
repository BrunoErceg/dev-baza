import Hero from "@/components/hero";
import { Container } from "@/components/layout/container";
import { WebsiteList } from "@/components/websiteList/WebsiteList";

export default function Home() {
  return (
    <Container>
      <Hero />
      <WebsiteList />
    </Container>
  );
}
