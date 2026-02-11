import { MdWebAsset } from "react-icons/md";

import { UserWebsiteWithCount } from "@/types/websites";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

import { AddWebsiteDialog } from "../../../components/ui/add-website-dialog";
import { DashboardCard } from "./dashboard-card";
import { UserWebsiteTable } from "./user-websites-table";

export function UserWebsitesSection({
  websites,
}: {
  websites: UserWebsiteWithCount[];
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
        <UserWebsiteTable websites={websites} />
      )}
    </DashboardCard>
  );
}
