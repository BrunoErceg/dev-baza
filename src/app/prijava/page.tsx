"use client";

import Link from "next/link";

import { Logo } from "@/components/logo";

import { GitHubLoginButton } from "@features/auth/components/github-login-button";
import { GoogleLoginButton } from "@features/auth/components/google-login-button";
import { LoginForm } from "@features/auth/components/login-form";

import { Card } from "@ui/card";
import { Separator } from "@ui/separator";
import { Large } from "@ui/typography";

export default function LoginPage() {
  return (
    <div className="mt-20 flex items-center justify-center">
      <Card className="flex w-full max-w-md flex-col items-center px-10">
        <Logo />
        <Large>Prijavi se u Dev Bazu</Large>

        <GoogleLoginButton />
        <GitHubLoginButton />

        <div className="flex w-full items-center justify-center overflow-hidden">
          <Separator />
          <span className="px-2 text-sm">ili</span>
          <Separator />
        </div>

        <LoginForm />

        <div className="mt-5 space-y-5">
          <p className="text-center text-sm">
            Nemate račun?
            <Link
              href="/registracija"
              className="text-muted-foreground ml-1 underline"
            >
              Registrirajte se
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
