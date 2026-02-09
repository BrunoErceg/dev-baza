import { auth } from "@/auth";
import { redirect } from "next/navigation";

import { getUser } from "@/data/user";
import { getPendingWebsites, getDashboardData } from "@/data/websites";

import { Container } from "@/components/layout/container";
import { UserWebsitesSection } from "./_components/user-websites-section";
import { AdminSection } from "./_components/admin-section";
import { UserDeleteSection } from "./_components/user-delete-section";
import { ProfileSettings } from "./_components/profile-settings";
import { DashboardHeader } from "./_components/dashboard-header";
import { DashboardStats } from "./_components/dashboard-stats";

export default async function dashboard() {
  const session = await auth();
  const user = await getUser(session.user.id);
  const pendingWebsites =
    user?.role === "ADMIN" ? await getPendingWebsites() : [];

  if (!user) {
    redirect("/api/auth/signin");
  }
  const { websites, stats } = await getDashboardData(user.id);

  return (
    <Container className="space-y-5">
      <DashboardHeader />
      <div className="flex gap-5">
        <div className="grow flex flex-col gap-5">
          <DashboardStats stats={stats} />
          <UserWebsitesSection websites={websites} />
          <AdminSection websites={pendingWebsites} />
        </div>
        <div className="grow flex flex-col gap-5">
          <ProfileSettings user={user} />
          <UserDeleteSection />
        </div>
      </div>
    </Container>
  );
}
