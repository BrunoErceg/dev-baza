import Link from "next/link";

import { auth } from "@/auth";

import { getUser, getUserNotifications } from "@/data/user";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { NavMenu } from "@/components/ui/nav-menu";
import { NavigationSheet } from "@/components/ui/navigation-sheet";

import { AddWebsiteDialog } from "../../ui/add-website-dialog";
import { Container } from "../container";
import { UserNav } from "./user-nav";
import { UserNotification } from "./user-notification";

export async function Navbar() {
  const session = await auth();
  const user = (session && (await getUser(session?.user.id))) || null;
  const notifications =
    (await getUserNotifications(session.user.id || "")).data || [];
  return (
    <nav className="py-5">
      <Container>
        <div className="flex h-full items-center justify-between py-4">
          <div className="flex items-center gap-12">
            <Link href="/">
              <Logo />
            </Link>

            {/* Desktop Menu */}
            <NavMenu className="hidden md:block" />
          </div>

          <div className="flex items-center gap-6">
            {session ? (
              <>
                <AddWebsiteDialog />
                <UserNotification initialData={notifications} />
                <UserNav userImage={user.image} />
              </>
            ) : (
              <>
                <Link href="/prijava">
                  <Button> Prijava</Button>
                </Link>
                <Link href="/registracija">
                  <Button variant="outline"> Registracija</Button>
                </Link>
              </>
            )}

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
