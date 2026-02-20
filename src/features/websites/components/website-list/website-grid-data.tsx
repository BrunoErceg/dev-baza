import { Suspense } from "react";

import { GridWebsiteData } from "@features/websites/types";

import { DataResponse } from "@/types/actions";

import { EmptyState } from "@ui/empty-state";
import { ErrorCard } from "@ui/error-card";

import { WebsiteGrid } from "./website-grid";
import { WebsiteListSkeleton } from "./website-list-skeleton";

export function WebsiteGridWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={<WebsiteListSkeleton />}>{children}</Suspense>;
}

export async function WebsiteGridData({
  getWebsites,
}: {
  getWebsites: () => Promise<DataResponse<GridWebsiteData[]>>;
}) {
  const { data: websites, error } = await getWebsites();

  return (
    <>
      {error ? (
        <ErrorCard description={error} className="mx-auto my-20" />
      ) : websites.length === 0 ? (
        <EmptyState
          className="my-20"
          title="Još nema dodanih web stranica"
          description="Budi prvi koji će podijeliti inspiraciju. Dodaj novu web stranicu i pokreni kolekciju!"
        />
      ) : (
        <WebsiteGrid websites={websites} />
      )}
    </>
  );
}
