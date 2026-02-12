"use client";

import Image from "next/image";
import Link from "next/link";

import { acceptWebsite } from "@/actions/admin-actions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import { P } from "@components/ui/typography";
import { Website } from "@prisma/client";

import { useServerAction } from "@/hooks/use-server-action";

import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { AdminRejectForm } from "./admin-reject-form";
import { DashboardDialog } from "./dashboard-dialog";

export function AdminWebsitesTable({ websites }: { websites: Website[] }) {
  return (
    <Table key={websites.length}>
      <TableHeader>
        <TableRow>
          <TableHead className="">Ime</TableHead>
          <TableHead>Url</TableHead>
          <TableHead className="text-right">Izbriši</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {websites.map((website) => (
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

            <TableCell className="flex justify-end gap-2 text-right">
              <ApprovedButton websiteId={website.id} />
              <DashboardDialog
                title="Upiši razlog za odbijanje"
                description=""
                cta={
                  <Button variant="destructive" className="w-fit">
                    Odbij
                  </Button>
                }
              >
                <AdminRejectForm websiteId={website.id} />
              </DashboardDialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

const ApprovedButton = ({ websiteId }: { websiteId: string }) => {
  const { isPending, action } = useServerAction(acceptWebsite);
  return (
    <Button onClick={() => action(websiteId)}>
      {isPending ? "Odobravanje..." : "Odobri"}
    </Button>
  );
};
