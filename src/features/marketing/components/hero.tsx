import { cn } from "@/lib/utils";

import { Badge } from "@ui/badge";
import { Card, CardContent } from "@ui/card";
import { H1, P } from "@ui/typography";

export default async function Hero({ className }: { className?: string }) {
  const highlights = [
    "🏆 Osvoji priznanje",
    "🚀 Istakni projekt",
    "🤝 Pronađi klijente",
    "📈 Podigni ljestvicu",
  ];
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center",
        className,
      )}
    >
      <Badge
        asChild
        className="border-border rounded-full py-1"
        variant="secondary"
      >
        <span>🏆 Osvoji priznanje za najbolji projekt</span>
      </Badge>
      <H1 className="mt-4 max-w-[23ch] leading-none! lg:text-7xl">
        Najbolji hrvatski web projekti na jednom mjestu!
      </H1>
      <P>
        Izloži svoj rad, osvoji priznanja zajednice i poveži se s klijentima.
        DevBaza je dom za projekte koji podižu ljestvicu digitalnog razvoja u
        Hrvatskoj.
      </P>
      <div className="mt-10 flex gap-5">
        {highlights.map((highlight) => (
          <Card className="px-0 py-3" key={highlight}>
            <CardContent>
              <span className="font-semibold">{highlight}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
