import { Card, CardContent } from "@ui/card";
import { FaqAccordion } from "@ui/faq";

import { FAQ_ITEMS } from "../data";

export default function FaqCard() {
  return (
    <Card>
      <CardContent>
        <FaqAccordion faqItems={FAQ_ITEMS} />
      </CardContent>
    </Card>
  );
}
