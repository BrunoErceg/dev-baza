import { LiaSortSolid } from "react-icons/lia";

import { SortBy } from "@features/websites/types";

import { TableHead, TableHeader, TableRow } from "@ui/table";

export function WebsiteTableHeader({
  onSortChange,
}: {
  onSortChange: (key: SortBy) => void;
}) {
  return (
    <TableHeader>
      <TableRow>
        <TableHead
          className="cursor-pointer"
          onClick={() => onSortChange("name")}
        >
          Ime <LiaSortSolid className="inline-block" />
        </TableHead>
        <TableHead>Url</TableHead>
        <TableHead>Status</TableHead>
        <TableHead
          className="cursor-pointer"
          onClick={() => onSortChange("views")}
        >
          Pregledi <LiaSortSolid className="inline-block" />
        </TableHead>
        <TableHead
          className="cursor-pointer"
          onClick={() => onSortChange("likes")}
        >
          Lajkovi <LiaSortSolid className="inline-block" />
        </TableHead>
        <TableHead className="text-right">Opcije</TableHead>
      </TableRow>
    </TableHeader>
  );
}
