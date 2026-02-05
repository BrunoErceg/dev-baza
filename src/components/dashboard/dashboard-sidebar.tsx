import { Muted, H2, H3 } from "../ui/typography";

export async function DashboardSidebar({ name }: { name?: string | null }) {
  return (
    <div className="w-250 flex flex-col gap-5">
      <div>
        <Muted>Welcome</Muted>
        <H2 className=" text-4xl -translate-x-1">{name}</H2>
      </div>
      <div>
        <H3 className="text-xl">Dashboard</H3>
        <Muted>Pregledajte i uredite podatke svog profila. Ovdje možete dodati i svoju web stranicu.</Muted>
      </div>
    </div>
  );
}
