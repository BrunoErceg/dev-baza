import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaqAccordion } from "@/components/ui/faq";

import { FAQ_ITEMS } from "../data/faq-data";

export default function FaqCard() {
  return (
    <Card>
      <CardContent>
        <FaqAccordion faqItems={FAQ_ITEMS} />
      </CardContent>
    </Card>
  );
}
