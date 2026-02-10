import Link from "next/link";

import { auth } from "@/auth";

import { cn } from "@/lib/utils";

import { Container } from "@/components/layout/container";
import { AddWebsiteDialog } from "@/components/ui/add-website-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { H1, P } from "@/components/ui/typography";

import { HighlightedWebsite } from "./highlighted-website";

export default async function Hero({ className }: { className?: string }) {
  const session = await auth();
  return (
    <div className={cn("flex w-full items-center", className)}>
      <div className="grow">
        <Badge
          asChild
          className="border-border rounded-full py-1"
          variant="secondary"
        >
          <span>🏆 Osvoji priznanje za najbolji projekt</span>
        </Badge>
        <H1 className="mt-6 max-w-[23ch] text-4xl leading-[1.2]! font-semibold tracking-[-0.035em] md:text-5xl lg:text-[2.75rem] xl:text-[3.25rem]">
          Najbolji hrvatski web projekti na jednom mjestu!
        </H1>
        <P className="text-foreground/80 mt-6 max-w-[60ch] sm:text-lg">
          Izloži svoj rad, osvoji priznanja zajednice i poveži se s klijentima.
          DevBaza je dom za projekte koji podižu ljestvicu digitalnog razvoja u
          Hrvatskoj.
        </P>
        <div className="mt-12 flex items-center gap-4">
          {session ? (
            <AddWebsiteDialog />
          ) : (
            <>
              <Button size="lg" asChild>
                <Link href="/prijava">Izloži svoj rad</Link>
              </Button>
            </>
          )}
        </div>
      </div>
      <HighlightedWebsite className="w-2/5" />
    </div>
  );
}
