import Link from "next/link";

import { H2, P } from "@ui/typography";

export default function VerifyEmailPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center">
      <H2>Provjerite svoj E-mail</H2>

      <P className="text-muted-foreground max-w-[40ch]">
        Poslali smo vam privremeni link za prijavu. Kliknite na gumb u mailu
        kako biste se ulogirali.
      </P>

      <div className="my-5 rounded-lg bg-gray-200 p-4 text-sm italic">
        Savjet: Ako ne vidite mail, provjerite "Spam" ili "Promocije".
      </div>

      <Link href="/prijava" className="text-sm underline">
        Pokušaj ponovno s drugom adresom
      </Link>
    </div>
  );
}
