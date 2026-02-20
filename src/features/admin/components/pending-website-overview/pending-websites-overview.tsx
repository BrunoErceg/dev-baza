import { Suspense } from "react";

import { auth } from "@/auth";

import { EmptyState } from "@ui/empty-state";
import { SectionCard } from "@ui/section-card";
import { Skeleton } from "@ui/skeleton";

import { getPendingWebsites } from "../../data";
import { PendingWebsitesTable } from "./pending-websites-table";

export function PendingWebsitesOverview() {
  return (
    <Suspense fallback={<Skeleton className="h-70 w-full rounded-md" />}>
      <WebsitesOverviewContent />
    </Suspense>
  );
}

async function WebsitesOverviewContent() {
  const { data: websites } = await getPendingWebsites();
  const isEmpty = websites.length === 0;

  return (
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
  );
}
