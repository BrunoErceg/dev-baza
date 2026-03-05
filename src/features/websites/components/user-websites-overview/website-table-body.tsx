import Link from "next/link";

import { Ellipsis } from "lucide-react";

import { Button } from "@ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@ui/dropdown-menu";
import { TableBody, TableCell, TableRow } from "@ui/table";
import { P } from "@ui/typography";

import { DeleteWebsiteMenuItem } from "./delete-website-menu-item";
import { StatusTooltip } from "./status-tooltip";

export function WebsiteTableBody({
  sortedWebsites,
}: {
  sortedWebsites: any[];
}) {
  return (
    <TableBody>
      {sortedWebsites.map((website) => (
        <TableRow key={website.id}>
          <TableCell className="font-medium">
            <P className="w-fit cursor-pointer md:text-base">{website.name}</P>
          </TableCell>
          <TableCell>
            <Link href={website.url} className="max-w-[60ch]" target="_blank">
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
  );
}
