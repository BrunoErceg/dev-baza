import { auth } from "@/auth";

import { PendingWebsitesOverview } from "@features/admin/components/pending-website-overview/pending-websites-overview";
import { DashboardStats } from "@features/analytics/components/dashboard-stats";
import { DashboardHeader } from "@features/dashboard/components/dashboard-header";
import { Container } from "@features/layout/components/container";
import { DeleteAccountSection } from "@features/users/components/delete-account-section";
import { ProfileSettingsSection } from "@features/users/components/profile-settings-card/profile-settings-section";
import { UserWebsitesOverview } from "@features/websites/components/user-websites-overview/user-websites-overview";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const session = await auth();
  const isAdmin = session.user.role === "ADMIN";
  return (
    <Container className="space-y-5">
      <DashboardHeader />

      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 space-y-5 lg:col-span-7">
          <DashboardStats />
          <UserWebsitesOverview />

          {isAdmin && <PendingWebsitesOverview />}
        </div>
        <div className="col-span-12 space-y-5 lg:col-span-5">
          <ProfileSettingsSection />
          <DeleteAccountSection />
        </div>
      </div>
    </Container>
  );
}
