import Link from "next/link";

import { GitHubLoginButton } from "@features/auth/components/github-login-button";
import { GoogleLoginButton } from "@features/auth/components/google-login-button";
import { LoginForm } from "@features/auth/components/login-form";

import { Separator } from "@ui/separator";
import { H3, Muted } from "@ui/typography";

export default function LoginPage() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="w-full max-w-xs space-y-5 text-center">
        <div className="mb-10">
          <H3 className="mb-1">Pridruži se Dev Bazi</H3>
          <Muted>Odaberite način prijave ili kreirajte račun.</Muted>
        </div>

        <LoginForm />

        <div className="flex w-full items-center justify-center overflow-hidden">
          <Separator />
          <span className="px-2 text-sm">ili</span>
          <Separator />
        </div>

        <GoogleLoginButton />
        <GitHubLoginButton />
        <div className="mt-5">
          <p className="text-center text-sm">
            Nastavkom prijave prihvaćate naše
            <br />
            <Link
              href="/registracija"
              className="text-muted-foreground ml-1 underline"
            >
              Uvjete korištenja
            </Link>
            <Link
              href="/registracija"
              className="text-muted-foreground ml-1 underline"
            >
              Pravila privatnosti
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
