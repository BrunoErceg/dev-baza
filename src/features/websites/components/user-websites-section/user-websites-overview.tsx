import { Suspense } from "react";

import { auth } from "@/auth";

import { getUserWebsitesTableData } from "@features/websites/data";

import { EmptyState } from "@ui/empty-state";
import { SectionCard } from "@ui/section-card";
import { Skeleton } from "@ui/skeleton";

import { AddWebsiteSheet } from "../add-website-sheet/add-website-sheet";
import { UserWebsiteTable } from "./user-websites-table";

export function UserWebsitesOverview() {
  return (
    <Suspense fallback={<Skeleton className="h-70 w-full rounded-md" />}>
      <WebsitesOverviewContent />
    </Suspense>
  );
}

async function WebsitesOverviewContent() {
  const session = await auth();
  const { data: websites } = await getUserWebsitesTableData(session.user.id);
  const isEmpty = websites.length === 0;
  return (
    <SectionCard
      title="Vaše web stranice"
      description="Upravljajte svojim projektima."
      cta={<AddWebsiteSheet />}
    >
      {isEmpty ? (
        <EmptyState
          title="Još nema web stranica"
          description="Još niste dodali nijednu web stranicu. Započnite tako što ćete dodati svoju prvu stranicu."
        />
      ) : (
        <UserWebsiteTable websites={websites} />
      )}
    </SectionCard>
  );
}
