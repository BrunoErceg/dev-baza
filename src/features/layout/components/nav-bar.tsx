import { ReactNode } from "react";

import { auth } from "@/auth";
import { Notification } from "@prisma/client";

import { LoginButton } from "@features/auth/components/login-button";
import { RegisterButton } from "@features/auth/components/register-button";
import { UserNotifications } from "@features/notifications/components/user-notifications";
import { getUserNotifications } from "@features/notifications/data";
import { getAuthUser, getUser } from "@features/user/data";
import { AddWebsiteDialog } from "@features/websites/components/add-website-dialog";

import { NavMenu } from "@ui/nav-menu";
import { NavigationSheet } from "@ui/navigation-sheet";

import { Logo } from "@components/logo";

import { UserNavDropdown } from "../../user/components/user-nav-dropdown";
import { Container } from "./container";

const NavBarLayout = ({ children }: { children: ReactNode }) => (
  <nav className="py-5">
    <Container>
      <div className="flex h-full items-center justify-between py-4">
        {children}
      </div>
    </Container>
  </nav>
);

const MobileNavigation = () => {
  return (
    <div className="md:hidden">
      <NavigationSheet />
    </div>
  );
};

export async function Navbar() {
  const session = await auth();
  const isAuth = !!session;
  const { data: user } = await getAuthUser();
  const { data: notifications } = await getUserNotifications();
  return (
    <NavBarLayout>
      <div className="flex items-center gap-12">
        <Logo />
        <NavMenu className="hidden translate-y-1 md:block" />
      </div>

      {isAuth ? (
        <div className="flex items-center gap-6">
          <AddWebsiteDialog />
          <UserNotifications initialData={notifications} />
          {user && (
            <UserNavDropdown
              user={{
                id: user.id,
                image: user.image,
              }}
            />
          )}
        </div>
      ) : (
        <div className="flex items-center gap-6">
          <LoginButton />
          <RegisterButton />
        </div>
      )}

      <MobileNavigation />
    </NavBarLayout>
  );
}
