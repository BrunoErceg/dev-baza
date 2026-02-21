import { Container } from "@features/layout/components/container";

import { H1, Large, P } from "@ui/typography";

export default function PrivacyPolicy() {
  return (
    <Container className="my-10">
      <section className="flex flex-col gap-10">
        <div>
          <H1 className="text-4xl font-extrabold tracking-tight">
            Pravila privatnosti
          </H1>
          <P className="text-muted-foreground">
            Zadnja izmjena: {new Date().toLocaleDateString("hr-HR")}
          </P>
        </div>
        <div>
          <Large>1. Prikupljanje podataka</Large>
          <P>
            Kroz sustav <strong>NextAuth</strong> prikupljamo vašu e-mail adresu
            i osnovne podatke profila. Ovi podaci služe isključivo za vašu
            identifikaciju unutar aplikacije.
          </P>
        </div>
        <div>
          <Large>2. Poruke i komunikacija</Large>
          <P>
            Sadržaj vaših poruka unutar aplikacije te podaci poslani kroz
            kontakt forme pohranjuju se u našoj bazi podataka kako bi omogućili
            funkcionalnost sustava poruka.
          </P>
        </div>

        <div>
          <Large>3. Dijeljenje podataka</Large>
          <P>
            Vaši kontakt podaci (e-mail) mogu biti prikazani drugim korisnicima
            s kojima stupite u izravnu komunikaciju unutar aplikacije.
          </P>
        </div>

        <div>
          <Large>4. Vaša prava</Large>
          <P>
            Imate pravo zatražiti trajno brisanje svog računa i svih povezanih
            poruka u bilo kojem trenutku.
          </P>
        </div>
      </section>
    </Container>
  );
}
