import { UserWebsitesWithStats } from "@/data/websites";
import { MdWebAsset } from "react-icons/md";

import { AddWebsiteDialog } from "./add-website-dialog";
import { DashboardCard } from "./dashboard-card";
import { ProfileWebsiteTable } from "./profile-websites-table";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export function UserWebsitesSection({
  websites,
}: {
  websites: UserWebsitesWithStats[];
}) {
  return (
    <DashboardCard
      key={websites.length}
      title="Vaše web stranice"
      description="Upravljajte svojim projektima."
      cta={<AddWebsiteDialog />}
    >
      {websites.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <MdWebAsset />
            </EmptyMedia>
            <EmptyTitle>Još nema web stranica</EmptyTitle>
            <EmptyDescription>
              Još niste dodali nijednu web stranicu. Započnite tako što ćete
              dodati svoju prvu stranicu.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <ProfileWebsiteTable websites={websites} />
      )}
    </DashboardCard>
  );
}
