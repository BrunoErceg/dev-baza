import { cookies } from "next/headers";

import { auth } from "@/auth";

import { WebsitesProvider } from "@/context/websites-context";
import { getAllApprovedWebsites } from "@/data/websites";
import { GridConfig } from "@/types/websites";

import { WebsiteGrid } from "./website-grid";
import { WebsiteNavigation } from "./website-navigation";

export async function WebsitesList() {
  const websites = await getAllApprovedWebsites();
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
        <WebsiteNavigation />
        <WebsiteGrid websites={websites} />
      </WebsitesProvider>
    </div>
  );
}
