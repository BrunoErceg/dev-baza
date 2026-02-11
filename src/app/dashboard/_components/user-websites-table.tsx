"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { LiaSortSolid } from "react-icons/lia";

import deleteWebsite from "@/actions/website-actions";
import { WEBSITE_STATUS } from "@/constants/staus";
import { Badge } from "@components/ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@components/ui/hover-card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@components/ui/tooltip";
import { P } from "@components/ui/typography";
import { WebsiteStatus } from "@prisma/client";
import { Ellipsis, TrashIcon } from "lucide-react";
import { toast } from "sonner";

import { useDeleteWebsite } from "@/hooks/use-delete-website";
import { cn } from "@/lib/utils";
import { UserWebsiteWithCount } from "@/types/websites";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Order = "asc" | "desc";
type SortBy = "likes" | "views" | "name";

export function UserWebsiteTable({
  websites,
}: {
  websites: UserWebsiteWithCount[];
}) {
  const [sortBy, setSortBy] = useState<SortBy>("name");
  const [order, setOrder] = useState<Order>("asc");

  const sortedWebsites = [...websites].sort((a, b) => {
    switch (sortBy) {
      case "likes":
        return order === "asc"
          ? a._count.likedBy - b._count.likedBy
          : b._count.likedBy - a._count.likedBy;
      case "views":
        return order === "asc" ? a.views - b.views : b.views - a.views;
      case "name":
        return order === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
    }
  });
  const handelSort = (key: SortBy) => {
    if (sortBy === key) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setOrder(key === "name" ? "asc" : "desc");
    }
  };

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

const StatusTooltip = ({
  status,
  rejectReason,
}: {
  status: WebsiteStatus;
  rejectReason?: string | null;
}) => {
  const Icon = WEBSITE_STATUS[status].Icon;
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Badge variant="outline" className={WEBSITE_STATUS[status].color}>
          <Icon />
          {WEBSITE_STATUS[status].label}{" "}
        </Badge>
      </TooltipTrigger>
      <TooltipContent>
        {status === "PENDING" ? (
          <p>
            Stranica je dodana i čeka pregled. Bit će javno
            <br /> vidljiva nakon odobrenja (obično unutar 48h).
          </p>
        ) : status === "REJECTED" ? (
          <p>Razlog: {rejectReason}</p>
        ) : (
          <p>
            Provjera uspješna. Vaša web stranica je sada javno vidljiva svim
            korisnicima.
          </p>
        )}
      </TooltipContent>
    </Tooltip>
  );
};

const WebsiteDeleteItem = ({ websiteId }: { websiteId: string }) => {
  const { executeDelete, isPending } = useDeleteWebsite();
  return (
    <DropdownMenuItem
      variant="destructive"
      className="cursor-pointer"
      onClick={() => executeDelete(websiteId)}
    >
      <TrashIcon />
      {isPending ? "Brisanje..." : "Izbriši"}
    </DropdownMenuItem>
  );
};
