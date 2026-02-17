import { Card, CardContent } from "@ui/card";
import { H2, P } from "@ui/typography";

import { HelpForm } from "./help-form";

export function HelpContactSection() {
  return (
    <div className="flex flex-col items-center gap-10">
      <div className="flex flex-col items-center justify-center text-center">
        <H2>Niste pronašli odgovor?</H2>
        <P>
          Pošaljite nam upit i odgovorit ćemo vam unutar 24 sata radnim danom.
        </P>
      </div>

      <HelpForm />
    </div>
  );
}
