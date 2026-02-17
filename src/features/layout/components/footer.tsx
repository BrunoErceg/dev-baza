import Link from "next/link";
import { ReactNode } from "react";

import { auth } from "@/auth";
import { Logo } from "@/components/logo";

import { LoginButton } from "@features/auth/components/login-button";
import { RegisterButton } from "@features/auth/components/register-button";
import { DashboardButton } from "@features/dashboard/components/dashboard-button";

import { cn } from "@/lib/utils";

import { LogoutButton } from "@ui/logout-button";
import { NavMenu } from "@ui/nav-menu";
import { Muted } from "@ui/typography";

import { Container } from "./container";

const FooterLayout = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <section className={cn("pt-20 pb-6", className)}>
    <Container>
      <footer>{children}</footer>
    </Container>
  </section>
);

const FooterLegal = () => {
  const legalLinks = [
    { text: "Uvjeti korištenja", url: "#" },
    { text: "Pravila privatnosti", url: "#" },
  ];
  return (
    <div className="mt-13 flex flex-col justify-between md:flex-row md:items-center">
      <Muted>{`© ${new Date().getFullYear()} dev-baza.hr. Sva prava pridržana.`}</Muted>

      <ul className="flex gap-4">
        {legalLinks.map((link, linkIdx) => (
          <Muted key={linkIdx}>
            <Link href={link.url}>{link.text}</Link>
          </Muted>
        ))}
      </ul>
    </div>
  );
};

const Footer = async ({ className }: { className?: string }) => {
  const session = await auth();
  const isAuth = !!session;
  return (
    <FooterLayout className={className}>
      <div className="flex justify-between">
        <Logo />
        <NavMenu />
        <div>
          {!isAuth ? (
            <div className="flex items-center gap-3">
              <LoginButton />
              <RegisterButton />
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <DashboardButton />
              <LogoutButton />
            </div>
          )}
        </div>
      </div>

      <FooterLegal />
    </FooterLayout>
  );
};

export { Footer };
