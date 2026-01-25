import { SunIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { NavMenu } from "@/components/navigation/nav-menu";
import { NavigationSheet } from "@/components/navigation/navigation-sheet";
import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { LogoutButton } from "@/components/navigation/logout-button";

export async function Navbar() {
  const session = await auth();
  console.log(session);
  return (
    <nav className="h-16 bg-[#f7f7f7]">
      <div className="mx-auto flex h-full max-w-(--breakpoint-xl) items-center justify-between px-4 sm:px-6 lg:px-8">
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
              <Link href="/profile">
                <Avatar>
                  <AvatarImage src="./default-avatar.jpg" />
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
    </nav>
  );
}
