"use client";
import { signOut } from "next-auth/react";
import { Button } from "../../ui/button";

export function LogoutButton() {
  return (
    <Button className="hidden sm:inline-flex" variant="outline" onClick={() => signOut({ callbackUrl: "/" })}>
      Odjava
    </Button>
  );
}
