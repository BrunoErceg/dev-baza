"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useTransition } from "react";

import { Button } from "@ui/button";
import { Spinner } from "@ui/spinner";

export function GitHubLoginButton() {
  const [isPending, startTransition] = useTransition();
  const onLogin = () => {
    startTransition(async () => {
      signIn("google", { redirectTo: "/dashboard" });
    });
  };
  return (
    <Button
      disabled={isPending}
      onClick={() => onLogin()}
      className="w-full gap-3"
    >
      {isPending ? (
        <Spinner />
      ) : (
        <Image
          src="/github-logo.svg"
          alt="GitHub"
          width={18}
          height={18}
          className="size-lg inline-block shrink-0 align-sub text-inherit"
        />
      )}
      {isPending ? "Prijava u tijeku..." : "Nastavi putem GitHuba"}
    </Button>
  );
}
