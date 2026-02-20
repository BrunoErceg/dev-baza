import { cookies } from "next/headers";
import { ReactNode } from "react";

import { auth } from "@/auth";

import { GridConfig } from "@features/websites/types";
import { WebsitesProvider } from "@features/websites/websites-context";

export async function WebsiteListWrapper({
  children,
}: {
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
      </WebsitesProvider>
    </div>
  );
}
