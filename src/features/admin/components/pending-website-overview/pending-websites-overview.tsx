import { auth } from "@/auth";

import { EmptyState } from "@ui/empty-state";
import { SectionCard } from "@ui/section-card";

import { getPendingWebsites } from "../../data";
import { PendingWebsitesTable } from "./pending-websites-table";

export async function PendingWebsitesOverview() {
  const session = await auth();
  const isAdmin = session.user.role === "ADMIN";
  const { data: websites } = await getPendingWebsites();
  const isEmpty = websites.length === 0;

  return (
    isAdmin && (
      <SectionCard
        title="Web stranice na čekanju"
        description="Odobrite web stranica koje čekaju pregled."
      >
        {isEmpty ? (
          <EmptyState
            title="Nema web stranica na čekanju"
            description="Trenutno nema web-stranice koje čekaju na tvoje odobrenje. Odmori se ili provjeri postojeće."
          />
        ) : (
          <PendingWebsitesTable websites={websites} />
        )}
      </SectionCard>
    )
  );
}
