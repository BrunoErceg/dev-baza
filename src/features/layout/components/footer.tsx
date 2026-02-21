import Link from "next/link";
import { ReactNode } from "react";

import { auth, signOut } from "@/auth";
import { Logo } from "@/components/logo";
import { LogIn } from "lucide-react";

import { cn } from "@/lib/utils";

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

const PageLinks = () => {
  const navLinks = [
    { text: "Pocetna", url: "/" },
    { text: "Istraži", url: "/istrazi" },
    { text: "Pomoć", url: "/pomoc" },
  ];
  return (
    <div className="mb-3 flex gap-8 text-base font-medium md:mb-0 md:text-sm">
      {navLinks.map((link, linkIdx) => (
        <Link
          key={linkIdx}
          href={link.url}
          className="duration-200 hover:opacity-70"
        >
          {link.text}
        </Link>
      ))}
    </div>
  );
};

const FooterLegal = () => {
  const legalLinks = [
    { text: "Uvjeti korištenja", url: "/uvjeti-koristenja" },
    { text: "Pravila privatnosti", url: "/pravila-privatnosti" },
  ];
  return (
    <div className="mt-10 flex flex-col items-center justify-between md:flex-row md:items-center">
      <Muted>{`© ${new Date().getFullYear()} dev-baza.hr. Sva prava pridržana.`}</Muted>

      <ul className="mt-3 flex gap-3 md:mt-0">
        {legalLinks.map((link, linkIdx) => (
          <Muted key={linkIdx}>
            <Link href={link.url}>{link.text}</Link>
          </Muted>
        ))}
      </ul>
    </div>
  );
};

const AuthOptions = () => (
  <div className="flex items-center gap-5 text-base font-medium md:text-sm">
    <Link href="/dashboard" className="duration-200 hover:opacity-70">
      Dashboard
    </Link>
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button
        type="submit"
        className="cursor-pointer duration-200 hover:opacity-70"
      >
        Odjavi se
      </button>
    </form>
  </div>
);

const LoginLink = () => (
  <Link
    href="/prijava"
    className="text-base font-medium duration-200 hover:opacity-70 md:text-sm"
  >
    Prijavi se
  </Link>
);

export async function Footer({ className }: { className?: string }) {
  const session = await auth();
  const isAuth = !!session;
  return (
    <FooterLayout className={className}>
      <div className="flex flex-col items-center md:flex-row md:justify-between">
        <Logo className="pb-4 text-3xl md:pb-0 md:text-2xl" />
        <PageLinks />
        <div>{!isAuth ? <LoginLink /> : <AuthOptions />}</div>
      </div>

      <FooterLegal />
    </FooterLayout>
  );
}
