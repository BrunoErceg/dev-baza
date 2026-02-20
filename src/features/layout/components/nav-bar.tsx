import { ExtendedUser } from "next-auth";
import { ReactNode } from "react";

import { auth } from "@/auth";

import { LoginButton } from "@features/auth/components/login-button";
import { RegisterButton } from "@features/auth/components/register-button";
import { UserNotifications } from "@features/notifications/components/user-notifications";
import { getUserNotifications } from "@features/notifications/data";
import { UserNavDropdown } from "@features/users/components/user-nav-dropdown";
import { getAuthUser } from "@features/users/data";
import { AddWebsiteSheet } from "@features/websites/components/add-website-sheet/add-website-sheet";

import { NavMenu } from "@ui/nav-menu";
import { NavigationSheet } from "@ui/navigation-sheet";

import { Logo } from "@components/logo";

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
  const user = session?.user;
  const { data: notifications } = await getUserNotifications();

  return (
    <NavBarLayout>
      <div className="flex items-center gap-12">
        <Logo />
        <NavMenu className="hidden translate-y-1 md:block" />
      </div>

      {user ? (
        <div className="flex items-center gap-6">
          <AddWebsiteSheet />
          <UserNotifications initialData={notifications} />
          {user && (
            <UserNavDropdown
              user={{
                username: user.username ?? "",
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
