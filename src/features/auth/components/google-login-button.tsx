"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";

import { Button } from "@ui/button";

export function GoogleLoginButton() {
  const onLogin = () => {
    signIn("google", { redirectTo: "/dashboard" });
  };
  return (
    <Button onClick={() => onLogin()} className="w-full gap-3">
      <Image
        src="/google-logo.svg"
        alt="GitHub"
        width={18}
        height={18}
        className="size-lg inline-block shrink-0 align-sub text-inherit"
      />{" "}
      Nastavi putem Google
    </Button>
  );
}
