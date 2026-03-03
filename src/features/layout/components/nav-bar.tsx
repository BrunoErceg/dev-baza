import Link from "next/link";
import { ReactNode } from "react";

import { auth } from "@/auth";

import { NavMenu } from "@features/layout/components/nav-menu";
import { NavigationSheet } from "@features/layout/components/navigation-sheet";
import { MessagesNotification } from "@features/messages/components/messages-notification";
import {
  getConversations,
  getUnreadMessagesCount,
} from "@features/messages/data";
import { UserNotifications } from "@features/notifications/components/user-notifications";
import { getUserNotifications } from "@features/notifications/data";
import { UserNavDropdown } from "@features/users/components/user-nav-dropdown";
import { AddWebsiteSheet } from "@features/websites/components/add-website-sheet/add-website-sheet";

import { Button } from "@ui/button";

import { Logo } from "@components/logo";

import { Container } from "./container";

export async function Navbar() {
  const session = await auth();
  const user = session?.user;

  const { data: notificationsData, error: notificationsError } =
    await getUserNotifications();

  let unreadNumber = 0;
  if (user) {
    const { data: unreadMessageCount } = await getUnreadMessagesCount(
      session.user.id,
    );
    unreadNumber = unreadMessageCount;
  }

  return (
    <NavBarLayout>
      <div className="flex items-center gap-4 md:gap-12">
        <NavigationSheet className="md:hidden" />
        <Logo className="text-2xl" />
        <NavMenu className="hidden translate-y-1 md:block" />
      </div>
      <div className="flex items-center gap-6">
        {user ? (
          <>
            <AddWebsiteSheet className="hidden md:block" />

            {user && (
              <MessagesNotification
                initialUnreadCount={unreadNumber}
                userId={user.id}
              />
            )}

            <UserNotifications
              userId={user.id}
              initialNotifications={notificationsData.notifications}
              initialUnreadCount={notificationsData.unreadCount}
              error={notificationsError}
            />

            <UserNavDropdown
              user={{
                username: user.username ?? "",
                image: user.image,
              }}
            />
          </>
        ) : (
          <>
            <Button>
              <Link href="/prijava">Prijavi se</Link>
            </Button>
            <Button variant="secondary" className="hidden md:flex">
              <Link href="/prijava">Napravi Račun</Link>
            </Button>
          </>
        )}
      </div>
    </NavBarLayout>
  );
}

const NavBarLayout = ({ children }: { children: ReactNode }) => (
  <nav className="py-5">
    <Container>
      <div className="flex h-full items-center justify-between py-4">
        {children}
      </div>
    </Container>
  </nav>
);
