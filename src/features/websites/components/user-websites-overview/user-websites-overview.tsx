import { Suspense } from "react";

import { auth } from "@/auth";

import { getUserWebsitesTableData } from "@features/websites/data";

import { EmptyState } from "@ui/empty-state";
import { ErrorState } from "@ui/error-state";
import { SectionCard } from "@ui/section-card";
import { Skeleton } from "@ui/skeleton";

import { AddWebsite } from "../add-website/add-website";
import { UserWebsiteTable } from "./user-websites-table";

export function UserWebsitesOverview() {
  return (
    <Suspense fallback={<Skeleton className="h-100 w-full rounded-md" />}>
      <WebsitesOverviewContent />
    </Suspense>
  );
}

async function WebsitesOverviewContent() {
  const session = await auth();
  const { data, error } = await getUserWebsitesTableData(session.user.id);
  const isEmpty = data.length === 0;

  return (
    <SectionCard
      title="Vaše web stranice"
      description="Upravljajte svojim projektima."
      cta={<AddWebsite />}
    >
      {isEmpty ? (
        <EmptyState
          title="Još nema web stranica"
          description="Još niste dodali nijednu web stranicu. Započnite tako što ćete dodati svoju prvu stranicu."
        />
      ) : error ? (
        <ErrorState description={error} />
      ) : (
        <UserWebsiteTable websites={data} />
      )}
    </SectionCard>
  );
}
