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
    <div className="flex gap-8 text-sm font-medium">
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
    { text: "Uvjeti korištenja", url: "#" },
    { text: "Pravila privatnosti", url: "#" },
  ];
  return (
    <div className="mt-10 flex flex-col justify-between md:flex-row md:items-center">
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

const AuthOptions = () => (
  <div className="flex items-center gap-5 text-sm font-medium">
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
    className="text-sm font-medium duration-200 hover:opacity-70"
  >
    Prijavi se
  </Link>
);

export async function Footer({ className }: { className?: string }) {
  const session = await auth();
  const isAuth = !!session;
  return (
    <FooterLayout className={className}>
      <div className="flex justify-between">
        <Logo className="text-2xl" />
        <PageLinks />
        <div>{!isAuth ? <LoginLink /> : <AuthOptions />}</div>
      </div>

      <FooterLegal />
    </FooterLayout>
  );
}
