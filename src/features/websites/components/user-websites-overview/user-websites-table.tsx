"use client";

import { useOderWebsiteTable as useOrderWebsiteTable } from "@features/websites/hooks";
import { UserWebsitesTableData } from "@features/websites/types";

import { Table } from "@ui/table";

import { WebsiteTableBody } from "./website-table-body";
import { WebsiteTableHeader } from "./website-table-header";

export function UserWebsiteTable({
  websites,
}: {
  websites: UserWebsitesTableData[];
}) {
  const { sortedWebsites, handleSort } = useOrderWebsiteTable(websites);

  return (
    <Table>
      <WebsiteTableHeader onSortChange={handleSort} />
      <WebsiteTableBody sortedWebsites={sortedWebsites} />
    </Table>
  );
}
