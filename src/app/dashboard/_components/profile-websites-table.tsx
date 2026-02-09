"use client";
import { useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { WebsiteStatus } from "@prisma/client";
import { cn } from "@/lib/utils";
import { TrashIcon } from "lucide-react";
import { LiaSortSolid } from "react-icons/lia";
import deleteWebsite from "@/actions/website-actions";
import { UserWebsitesWithStats } from "@/data/websites";

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
import { P } from "@components/ui/typography";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@components/ui/tooltip";
import { Badge } from "@components/ui/badge";
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

export function ProfileWebsiteTable({
  websites,
}: {
  websites: UserWebsitesWithStats[];
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
              className="text-right cursor-pointer"
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
                    <P className="cursor-pointer w-fit">{website.name}</P>
                  </HoverCardTrigger>
                  <HoverCardContent side="top" className="flex   w-80 h-64">
                    <Image
                      src={website.imageUrl}
                      alt="Website"
                      width={320}
                      height={256}
                      priority
                      className="rounded-lg w-80 h-56 object-cover "
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost">...</Button>
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
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Badge
          variant="secondary"
          className={cn(
            "cursor-help",
            status === "REJECTED"
              ? "bg-red-300"
              : status === "PENDING"
                ? "bg-amber-200"
                : "bg-green-300",
          )}
        >
          {status}
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
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handleDelete = async (websiteId: string) => {
    startTransition(async () => {
      const result = await deleteWebsite(websiteId);
      if (result.success) {
        toast.success(result.success);
        router.refresh();
      } else if (result.error) {
        toast.error(result.error);
      }
    });
  };
  return (
    <DropdownMenuItem
      variant="destructive"
      className="cursor-pointer"
      onClick={() => handleDelete(websiteId)}
    >
      <TrashIcon />
      {isPending ? "Brisanje..." : "Izbriši"}
    </DropdownMenuItem>
  );
};
