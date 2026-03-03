import { Container } from "@features/layout/components/container";

import { H1, Large, P } from "@ui/typography";

export const metadata = {
  title: "Uvjeti korištenja",
};

export default function TermsOfService() {
  return (
    <Container className="my-10">
      <section className="flex flex-col gap-10">
        <div>
          <H1 className="text-4xl font-extrabold tracking-tight">
            Uvjeti korištenja
          </H1>
          <P className="text-muted-foreground">
            Zadnja izmjena: {new Date().toLocaleDateString("hr-HR")}
          </P>
        </div>

        <div>
          <Large>1. Prihvaćanje uvjeta</Large>
          <P>
            Korištenjem ove aplikacije pristajete na ove uvjete. Ako se ne
            slažete s bilo kojim dijelom navedenih pravila, molimo vas da
            prestanete koristiti naše usluge.
          </P>
        </div>

        <div>
          <Large>2. Ponašanje korisnika</Large>
          <P>
            Strogo je zabranjeno slanje uvredljivog, ilegalnog ili neželjenog
            (SPAM) sadržaja putem sustava poruka i kontakt formi. Korisnik je
            isključivo odgovoran za sadržaj koji šalje.
          </P>
        </div>

        <div>
          <Large>3. Odgovornost</Large>
          <P>
            Aplikacija služi kao platforma za komunikaciju. Ne snosimo
            odgovornost za točnost podataka koje korisnici razmjenjuju niti za
            dogovore proizašle iz međusobne komunikacije korisnika.
          </P>
        </div>

        <div>
          <Large>4. Prekid usluge</Large>
          <P>
            Zadržavamo pravo privremenog ili trajnog gašenja računa korisnicima
            koji krše ova pravila, zloupotrebljavaju sustav poruka ili na bilo
            koji način ometaju normalan rad aplikacije.
          </P>
        </div>
      </section>
    </Container>
  );
}
