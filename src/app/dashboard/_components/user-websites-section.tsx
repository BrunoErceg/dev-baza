import { Website } from "@prisma/client";
import { AddWebsiteDialog } from "./add-website-dialog";
import { DashboardCard } from "./dashboard-card";
import { ProfileWebsiteTable } from "./profile-websites-table";
import { Card } from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { MdWebAsset } from "react-icons/md";

export function UserWebsitesSection({ websites }: { websites: Website[] }) {
  return (
    <DashboardCard
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
