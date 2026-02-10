import { redirect } from "next/navigation";

import { auth } from "@/auth";

import { getUser } from "@/data/user";
import { getDashboardData, getPendingWebsites } from "@/data/websites";

import { Container } from "@/components/layout/container";

import { AdminSection } from "./_components/admin-section";
import { DashboardHeader } from "./_components/dashboard-header";
import { DashboardStats } from "./_components/dashboard-stats";
import { ProfileSettings } from "./_components/profile-settings";
import { UserDeleteSection } from "./_components/user-delete-section";
import { UserWebsitesSection } from "./_components/user-websites-section";

export default async function dashboard() {
  const session = await auth();
  const user = await getUser(session.user.id);

  if (!user) {
    redirect("/api/auth/signin");
  }
  const pendingWebsites =
    user?.role === "ADMIN" ? await getPendingWebsites() : [];
  const { websites, stats } = await getDashboardData(user.id);

  return (
    <Container className="space-y-5">
      <DashboardHeader />
      <div className="flex gap-5">
        <div className="flex grow flex-col gap-5">
          <DashboardStats stats={stats} />
          <UserWebsitesSection websites={websites} />
          <AdminSection websites={pendingWebsites} />
        </div>
        <div className="flex grow flex-col gap-5">
          <ProfileSettings user={user} />
          <UserDeleteSection />
        </div>
      </div>
    </Container>
  );
}
