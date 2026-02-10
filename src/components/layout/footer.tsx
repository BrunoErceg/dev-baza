import Link from "next/link";

import { auth } from "@/auth";

import { cn } from "@/lib/utils";

import { Logo } from "@/components/logo";

import { Button } from "../ui/button";
import { LogoutButton } from "../ui/logout-button";
import { NavMenu } from "../ui/nav-menu";
import { Container } from "./container";

interface MenuItem {
  title: string;
  links: {
    text: string;
    url: string;
  }[];
}

interface FooterProps {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  className?: string;
  tagline?: string;
  menuItems?: MenuItem[];
  copyright?: string;
  bottomLinks?: {
    text: string;
    url: string;
  }[];
}

const Footer = async ({
  className,

  copyright = `© ${new Date().getFullYear()} dev-baza.hr. Sva prava pridržana.`,
  bottomLinks = [
    { text: "Uvjeti korištenja", url: "#" },
    { text: "Pravila privatnosti", url: "#" },
  ],
}: FooterProps) => {
  const session = await auth();
  return (
    <section className={cn("pt-20 pb-6", className)}>
      <Container>
        <footer>
          <div className="flex justify-between">
            <Logo />
            <NavMenu />
            <div>
              <div className="flex items-center gap-3">
                {!session?.user?.id ? (
                  <>
                    <Link href="/prijava">
                      <Button>Prijava</Button>
                    </Link>
                    <Link href="/registracija">
                      <Button variant="outline">Registracija</Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Button asChild>
                      <Link href="/dashboard">Dashboard</Link>
                    </Button>

                    <LogoutButton />
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="text-muted-foreground mt-5 flex flex-col justify-between gap-4 pt-8 text-sm font-medium md:flex-row md:items-center">
            <p>{copyright}</p>
            <ul className="flex gap-4">
              {bottomLinks.map((link, linkIdx) => (
                <li key={linkIdx} className="hover:text-primary underline">
                  <a href={link.url}>{link.text}</a>
                </li>
              ))}
            </ul>
          </div>
        </footer>
      </Container>
    </section>
  );
};

export { Footer };
