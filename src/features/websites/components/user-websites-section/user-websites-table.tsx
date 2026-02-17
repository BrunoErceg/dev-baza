"use client";
import Image from "next/image";
import Link from "next/link";
import { LiaSortSolid } from "react-icons/lia";

import { Ellipsis } from "lucide-react";

import { useOderWebsiteTable } from "@features/websites/hooks";
import { UserWebsiteWithCount } from "@features/websites/types";

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

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@components/ui/hover-card";

import { StatusTooltip } from "./status-tooltip";
import { WebsiteDeleteItem } from "./website-delete-item";

export function UserWebsiteTable({
  websites,
}: {
  websites: UserWebsiteWithCount[];
}) {
  const { sortedWebsites, handelSort } = useOderWebsiteTable({ websites });

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              className="cursor-pointer"
              onClick={() => handelSort("name")}
            >
              Ime <LiaSortSolid className="inline-block" />
            </TableHead>
            <TableHead>Url</TableHead>
            <TableHead>Status</TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handelSort("views")}
            >
              Pregledi <LiaSortSolid className="inline-block" />
            </TableHead>
            <TableHead
              className="cursor-pointer text-right"
              onClick={() => handelSort("likes")}
            >
              Lajkovi <LiaSortSolid className="inline-block" />
            </TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedWebsites.map((website) => (
            <TableRow key={website.id}>
              <TableCell className="font-medium">
                <HoverCard openDelay={10} closeDelay={100}>
                  <HoverCardTrigger asChild>
                    <P className="w-fit cursor-pointer">{website.name}</P>
                  </HoverCardTrigger>
                  <HoverCardContent side="top" className="flex h-64 w-80">
                    <Image
                      src={website.imageUrl}
                      alt="Website"
                      width={320}
                      height={256}
                      priority
                      className="h-56 w-80 rounded-lg object-cover"
                    />
                  </HoverCardContent>
                </HoverCard>
              </TableCell>
              <TableCell>
                <Link href={website.url} target="_blank">
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
              <TableCell className="text-right">
                {website._count.likedBy}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost">
                      <Ellipsis />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-fit" align="end">
                    <DropdownMenuGroup>
                      <WebsiteDeleteItem websiteId={website.id} />
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
