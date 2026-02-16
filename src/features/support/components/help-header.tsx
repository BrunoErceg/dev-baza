import { CircleQuestionMark } from "lucide-react";

import { H1, P } from "@/components/ui/typography";

export function HelpHeader() {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <H1 className="flex items-center justify-center gap-2 lg:text-4xl">
        <CircleQuestionMark size={35} className="translate-y-0.5" /> Centar za
        pomoć i podršku
      </H1>
      <P>
        Pronađite odgovore na najčešća pitanja o korištenju Dev-baze,
        upravljanju profilom i procesu odobravanja vaših web projekata.
      </P>
    </div>
  );
}
