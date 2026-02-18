"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { H1, H2, P } from "@ui/typography";

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const errorMessages: Record<string, string> = {
    Configuration: "Problem s postavkama servera. Javi se podršci.",
    AccessDenied: "Pristup odbijen. Nemate dopuštenje za prijavu.",
    Verification: "Link je istekao ili je već iskorišten. Pokušaj ponovno.",
    Default: "Došlo je do nepoznate greške pri prijavi.",
  };

  const message =
    errorMessages[error as keyof typeof errorMessages] || errorMessages.Default;

  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center">
      <H2>Ups! Greška pri prijavi</H2>
      <P className="text-destructive bg-destructive/10 mb-5 rounded-md p-4 text-sm">
        {message}
      </P>
      <Link href="/prijava" className="text-sm underline">
        Vrati se na prijavu
      </Link>
    </div>
  );
}
