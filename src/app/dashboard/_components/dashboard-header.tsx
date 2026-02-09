import { Card, CardContent } from "@/components/ui/card";
import { H2, H3, Muted } from "@/components/ui/typography";

export function DashboardHeader() {
  return (
    <Card>
      <CardContent className="flex justify-between items-center">
        <div>
          <H3 className="text-xl">Nadzorna ploča</H3>
          <Muted>
            Pregledajte i uredite podatke svog profila. Ovdje možete dodati i
            svoju web stranicu.
          </Muted>
        </div>
      </CardContent>
    </Card>
  );
}
