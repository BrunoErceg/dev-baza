import { redirect } from "next/navigation";

import { auth } from "@/auth";

import { PendingWebsitesCard } from "@features/admin/components/pending-website-card/pending-websites-card";
import { DashboardHeader } from "@features/dashboard/components/dashboard-header";
import { getDashboardData } from "@features/dashboard/data";
import { Container } from "@features/layout/components/container";
import { ProfileSettingsCard } from "@features/user/components/profile-settings-card/profile-settings-card";
import { UserDeleteCard } from "@features/user/components/user-delete-card/user-delete-card";
import { getUser } from "@features/user/data";
import { StatsSection } from "@features/websites/components/stats-section";
import { UserWebsitesSection } from "@features/websites/components/user-websites-section/user-websites-section";

export default async function dashboard() {
  const session = await auth();
  const { data: user } = await getUser(session.user.id);
  const isAdmin = user?.role === "ADMIN";

  if (!user) {
    redirect("/api/auth/signin");
  }

  const { websites, stats } = await getDashboardData(user.id);

  return (
    <Container className="space-y-5">
      <DashboardHeader />
      <div className="flex gap-5">
        <div className="flex grow flex-col gap-5">
          <StatsSection stats={stats} />
          <UserWebsitesSection websites={websites} />
          {isAdmin && <PendingWebsitesCard />}
        </div>
        <div className="flex grow flex-col gap-5">
          <ProfileSettingsCard user={user} />
          <UserDeleteCard />
        </div>
      </div>
    </Container>
  );
}
