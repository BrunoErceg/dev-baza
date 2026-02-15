import { cookies } from "next/headers";
import { ReactNode } from "react";

import { auth } from "@/auth";

import { WebsitesProvider } from "@/context/websites-context";
import { GridConfig, GridWebsiteData } from "@/types/websites";

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
          <div className="my-4 rounded-md border border-red-200 bg-red-50 p-4 text-red-600">
            {error}
          </div>
        ) : websites.length === 0 ? (
          <div className="text-muted-foreground py-10 text-center">
            <p>Trenutno ne postoje web stranice.</p>
          </div>
        ) : (
          <WebsiteGrid websites={websites} />
        )}
      </WebsitesProvider>
    </div>
  );
}
