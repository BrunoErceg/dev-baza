import { getAllApprovedWebsites } from "@/data/websites";
import { WebsiteGrid } from "./website-grid";
import { auth } from "@/auth";
import { cookies } from "next/headers";
import { ExploreNavigation } from "./explore-navigation";
import { ExploreProvider } from "@/context/explore-context";

export async function ExploreWebsites() {
  const websites = await getAllApprovedWebsites();
  const session = await auth();
  const cookieStore = await cookies();
  const gridConfigCookie = cookieStore.get("gridConfig")?.value as
    | "big"
    | "small"
    | undefined;

  return (
    <div>
      <ExploreProvider gridConfigCookie={gridConfigCookie}>
        <ExploreNavigation />
        <WebsiteGrid websites={websites} userid={session?.user.id} />
      </ExploreProvider>
    </div>
  );
}
