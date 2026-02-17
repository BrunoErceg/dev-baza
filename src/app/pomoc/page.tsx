import { Container } from "@features/layout/components/container";
import FaqCard from "@features/support/components/faq-card";
import { HelpContactSection } from "@features/support/components/help-contact-section";
import { HelpHeader } from "@features/support/components/help-header";

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
