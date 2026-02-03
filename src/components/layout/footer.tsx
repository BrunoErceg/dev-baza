import { cn } from "@/lib/utils";

import { Logo } from "@/components/logo";
import { Container } from "./container";

interface MenuItem {
  title: string;
  links: {
    text: string;
    url: string;
  }[];
}

interface Footer2Props {
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

const Footer = ({
  logo = {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg",
    alt: "blocks for shadcn/ui",
    title: "Shadcnblocks.com",
    url: "https://www.shadcnblocks.com",
  },
  className,
  tagline = "Dom najboljih web radova u Hrvatskoj",
  menuItems = [
    {
      title: "Glavna navigacija",
      links: [
        { text: "Početna", url: "#" },
        { text: "Istraži", url: "#" },
      ],
    },
    {
      title: "Info",
      links: [
        { text: "O nama", url: "#" },
        { text: "Kontakt", url: "#" },
      ],
    },
    {
      title: "Korisnička sekcija",
      links: [
        { text: "Dashboard", url: "#" },
        { text: "Prijava", url: "#" },
        { text: "Registracija", url: "#" },
      ],
    },
  ],
  copyright = `© ${new Date().getFullYear()} dev-baza.hr. Sva prava pridržana.`,
  bottomLinks = [
    { text: "Uvjeti korištenja", url: "#" },
    { text: "Pravila privatnosti", url: "#" },
  ],
}: Footer2Props) => {
  return (
    <section className={cn("pb-6 pt-20   mt-20", className)}>
      <Container>
        <footer>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
            <div className="col-span-3 mb-8 lg:mb-0">
              <div className="flex items-center gap-2 lg:justify-start">
                <Logo />
              </div>
              <p className="mt-4 font-semibold">{tagline}</p>
            </div>
            {menuItems.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="space-y-4 text-muted-foreground">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx} className="font-medium hover:text-primary">
                      <a href={link.url}>{link.text}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-24 flex flex-col justify-between gap-4 border-t pt-8 text-sm font-medium text-muted-foreground md:flex-row md:items-center">
            <p>{copyright}</p>
            <ul className="flex gap-4">
              {bottomLinks.map((link, linkIdx) => (
                <li key={linkIdx} className="underline hover:text-primary">
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
