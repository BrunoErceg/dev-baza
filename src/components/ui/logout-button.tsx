"use client";
import { signOut } from "next-auth/react";

import { cn } from "@/lib/utils";

import { Button } from "./button";

export function LogoutButton({ className }: { className?: string }) {
  return (
    <Button
      className={cn("hidden sm:inline-flex", className)}
      variant="outline"
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      Odjava
    </Button>
  );
}
