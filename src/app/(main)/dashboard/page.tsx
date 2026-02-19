import { PendingWebsitesOverview } from "@features/admin/components/pending-website-overview/pending-websites-overview";
import { DashboardStats } from "@features/analytics/components/dashboard-stats";
import { DashboardHeader } from "@features/dashboard/components/dashboard-header";
import { Container } from "@features/layout/components/container";
import { ProfileSettingsSection } from "@features/users/components/profile-settings-card/profile-settings-section";
import { DeleteAccountSection } from "@features/users/components/user-delete-card/delete-account-section";
import { UserWebsitesOverview } from "@features/websites/components/user-websites-section/user-websites-overview";

export default async function DashboardPage() {
  return (
    <Container className="space-y-5">
      <DashboardHeader />
      <div className="flex gap-5">
        <div className="flex grow flex-col gap-5">
          <DashboardStats />
          <UserWebsitesOverview />
          <PendingWebsitesOverview />
        </div>
        <div className="flex w-2xl flex-col gap-5">
          <ProfileSettingsSection />
          <DeleteAccountSection />
        </div>
      </div>
    </Container>
  );
}
