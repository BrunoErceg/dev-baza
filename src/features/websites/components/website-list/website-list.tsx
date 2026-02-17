import { cookies } from "next/headers";
import { ReactNode } from "react";

import { auth } from "@/auth";

import { GridConfig, GridWebsiteData } from "@features/websites/types";
import { WebsitesProvider } from "@features/websites/websites-context";

import { EmptyState } from "@ui/empty-state";
import { ErrorCard } from "@ui/error-card";

import { WebsiteGrid } from "./website-grid";

/**
 * WebsiteList component that orchestrates the display of websites.
 * * @important
 * This component follows a "Composition Pattern". It MUST receive
 * `WebsiteNavigation` as its child to ensure consistent layout and filtering.
 * * @example
 * <WebsiteList websites={data} error={null}>
 *  <WebsiteNavigation>
 *    <WebsiteSortSelect />
 *    <WebsiteFilter />
 *    <GridToggle />
 *  </WebsiteNavigation>
 * </WebsiteList>
 */
export async function WebsiteList({
  websites,
  error,
  children,
}: {
  websites: GridWebsiteData[];
  error: string | null;
  children?: ReactNode;
}) {
  const session = await auth();
  const isAdmin = session?.user.role === "ADMIN";
  const cookieStore = await cookies();
  const initialGridConfig =
    (cookieStore.get("gridConfig")?.value as GridConfig) || "big";

  return (
    <div>
      <WebsitesProvider
        userId={session?.user.id}
        initialGridConfig={initialGridConfig}
      >
        {children}

        {error ? (
          <ErrorCard description={error} className="mx-auto my-20" />
        ) : websites.length === 0 ? (
          <EmptyState
            className="my-20"
            title="Još nema dodanih web stranica"
            description="Budi prvi koji će podijeliti inspiraciju. Dodaj novu web stranicu i pokreni kolekciju!"
          />
        ) : (
          <WebsiteGrid websites={websites} isAdmin={isAdmin} />
        )}
      </WebsitesProvider>
    </div>
  );
}
