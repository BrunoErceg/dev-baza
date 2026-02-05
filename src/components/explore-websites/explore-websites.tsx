import { getAllApprovedWebsites } from "@/data/websites";
import { WebsiteFilterBar } from "./website-filter-bar";
import { WebsiteGrid } from "./website-grid/website-grid";
import { auth } from "@/auth";

export async function ExploreWebsites({ children }: { children?: React.ReactNode }) {
  const websites = await getAllApprovedWebsites();
  const session = await auth();

  return (
    <div>
      <WebsiteFilterBar />
      {children}

      <WebsiteGrid websites={websites} userid={session?.user.id} />
    </div>
  );
}
