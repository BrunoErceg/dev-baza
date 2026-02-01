import { ArrowUpRight, CirclePlay } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-16 px-6 py-8">
      <div className="max-w-6xl text-center">
        <h1 className="mt-6 font-semibold uppercase text-4xl tracking-tighter sm:text-5xl md:text-6xl md:leading-[1.1] lg:text-8xl">
          Dom najboljih web radova u Hrvatskoj
        </h1>
        <p className="mt-6 max-w-3xl mx-auto text-foreground/80 md:text-lg">
          Izgradi svoj profil, objavi portfelj i poveži se s vodećim dizajnerima. Pokaži svijetu svoje najbolje projekte na jednom mjestu.
        </p>
        {/* 
        <div className="mt-10 flex items-center justify-center gap-4">
          <Button className="rounded-full text-base" size="lg">
            Get Started <ArrowUpRight className="h-5! w-5!" />
          </Button>
        </div>*/}
      </div>
      <div className="mx-auto aspect-video w-full max-w-(--breakpoint-xl) rounded-xl bg-accent" />
    </div>
  );
}
