import { Container } from "@/components/layout/container";

import FaqCard from "./_components/faq-card";
import { HelpContactSection } from "./_components/help-contact-section";
import { HelpHeader } from "./_components/help-header";

export default function HelpPage() {
  return (
    <section className="my-15">
      <Container className="mt-10 flex flex-col gap-15 lg:max-w-4xl">
        <HelpHeader />
        <FaqCard />
        <HelpContactSection />
      </Container>
    </section>
  );
}
