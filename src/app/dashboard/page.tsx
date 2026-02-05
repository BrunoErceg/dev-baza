import { auth } from "@/auth";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { DashboardDeleteProfile } from "@/components/dashboard/dashboard-delete-profile";
import { DashboardAdmin } from "@/components/dashboard/admin/dashboard-admin";
import { DashboardWebsites } from "@/components/dashboard/websites/dashboard-websites";
import { getProfile } from "@/data/profile";
import { getPendingWebsites } from "@/data/websites";
import { redirect } from "next/navigation";
import DashboardSettings from "@/components/dashboard/dashboard-settings";
import { Container } from "@/components/layout/container";

export default async function dashboard() {
  const session = await auth();
  const user = await getProfile(session.user.id);

  if (!user) {
    redirect("/api/auth/signin");
  }
  const pendingWebsites = await getPendingWebsites();

  return (
    <Container className="mt-15 flex gap-5">
      <DashboardSidebar name={user.name} key={user.name} />

      <div className="w-full flex flex-col gap-7">
        <DashboardSettings user={user} />
        <DashboardWebsites userid={user?.id} />
        {user?.role === "ADMIN" && <DashboardAdmin websites={pendingWebsites} />}
        <DashboardDeleteProfile />
      </div>
    </Container>
  );
}
