"use client";
import Link from "next/link";
import { LiaSortSolid } from "react-icons/lia";

import { Ellipsis } from "lucide-react";

import { useOderWebsiteTable as useOrderWebsiteTable } from "@features/websites/hooks";
import { UserWebsitesTableData } from "@features/websites/types";

import { Button } from "@ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@ui/table";
import { P } from "@ui/typography";

import { DeleteWebsiteMenuItem } from "./delete-website-menu-item";
import { StatusTooltip } from "./status-tooltip";

export function UserWebsiteTable({
  websites,
}: {
  websites: UserWebsitesTableData[];
}) {
  const { sortedWebsites, handleSort } = useOrderWebsiteTable(websites);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("name")}
            >
              Ime <LiaSortSolid className="inline-block" />
            </TableHead>
            <TableHead>Url</TableHead>
            <TableHead>Status</TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("views")}
            >
              Pregledi <LiaSortSolid className="inline-block" />
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("likes")}
            >
              Lajkovi <LiaSortSolid className="inline-block" />
            </TableHead>
            <TableHead className="text-right">Opcije</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedWebsites.map((website) => (
            <TableRow key={website.id}>
              <TableCell className="font-medium">
                <P className="w-fit cursor-pointer text-base">{website.name}</P>
              </TableCell>
              <TableCell>
                <Link
                  href={website.url}
                  className="max-w-[60ch]"
                  target="_blank"
                >
                  {website.url}
                </Link>
              </TableCell>
              <TableCell>
                <StatusTooltip
                  status={website.status}
                  rejectReason={website.rejectionReason}
                />
              </TableCell>
              <TableCell>{website.views}</TableCell>
              <TableCell>{website._count.likedBy}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost">
                      <Ellipsis />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-fit" align="end">
                    <DropdownMenuGroup>
                      <DeleteWebsiteMenuItem websiteId={website.id} />
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
