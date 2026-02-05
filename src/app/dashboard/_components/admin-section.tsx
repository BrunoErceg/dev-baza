import { Website } from "@prisma/client";
import { MdWebAsset } from "react-icons/md";

import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty";
import { DashboardCard } from "./dashboard-card";
import { AdminWebsitesTable } from "./admin-websites-table";

export function AdminSection({ websites }: { websites: Website[] }) {
  return (
    <DashboardCard
      title="Web stranice na čekanju"
      description="Odobrite web stranice koje čekaju pregled."
    >
      {websites.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <MdWebAsset />
            </EmptyMedia>
            <EmptyTitle>Nema web-stranica na čekanju</EmptyTitle>
            <EmptyDescription>
              Trenutno nema novih web stranica koje čekaju na tvoje odobrenje.
              Odmori se ili provjeri postojeće.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <AdminWebsitesTable websites={websites} />
      )}
    </DashboardCard>
  );
}
