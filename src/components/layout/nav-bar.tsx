import Link from "next/link";

import { auth } from "@/auth";
import { SunIcon } from "lucide-react";

import { Logo } from "@/components/logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/components/ui/logout-button";
import { NavMenu } from "@/components/ui/nav-menu";
import { NavigationSheet } from "@/components/ui/navigation-sheet";

import { Container } from "./container";

export async function Navbar() {
  const session = await auth();
  return (
    <nav className="h-16 bg-[#f7f7f7]">
      <Container>
        <div className="flex h-full items-center justify-between py-4">
          <div className="flex items-center gap-12">
            <Link href="/">
              <Logo />
            </Link>

            {/* Desktop Menu */}
            <NavMenu className="hidden md:block" />
          </div>

          <div className="flex items-center gap-3">
            {session ? (
              <>
                <Link href="/dashboard">
                  <Avatar>
                    <AvatarImage src="https://jrgxq33rwp.ufs.sh/f/BNaNzrQS3KNeOIpQ9sfX6YjFCOQ0PUb84RtzAZJkh3B95pvN" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Link>
                <Button>Dodaj web-stranicu</Button>
                <LogoutButton />
              </>
            ) : (
              <>
                <Link href="/prijava">
                  <Button>Prijava</Button>
                </Link>
                <Link href="/registracija">
                  <Button variant="outline">Registracija</Button>
                </Link>
              </>
            )}

            <Button size="icon" variant="outline">
              <SunIcon />
            </Button>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <NavigationSheet />
            </div>
          </div>
        </div>
      </Container>
    </nav>
  );
}
