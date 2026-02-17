import { Card, CardContent } from "@ui/card";
import { H3, Muted } from "@ui/typography";

export function DashboardHeader() {
  return (
    <Card>
      <CardContent className="flex items-center justify-between">
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
