import { CircleQuestionMark } from "lucide-react";

import { H1, P } from "@ui/typography";

export function HelpHeader() {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <H1 className="lg:text-4xl">Centar za pomoć i podršku</H1>
      <P className="mt-4">
        Pronađite odgovore na najčešća pitanja o korištenju Dev-baze,
        upravljanju profilom i procesu odobravanja vaših web projekata.
      </P>
    </div>
  );
}
