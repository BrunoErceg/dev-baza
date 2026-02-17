import Image from "next/image";

import { signIn } from "@/auth";

import { Button } from "@ui/button";

export function GitHubLoginButton() {
  return (
    <Button
      onClick={() => signIn("github", { redirectTo: "/dashboard" })}
      className="w-full gap-3"
    >
      <Image
        src="/github-logo.svg"
        alt="GitHub"
        width={18}
        height={18}
        className="size-lg inline-block shrink-0 align-sub text-inherit"
      />
      Nastavi putem GitHuba
    </Button>
  );
}
