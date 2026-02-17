"use client";

import Link from "next/link";

import { Website } from "@prisma/client";

import { acceptWebsite } from "@features/admin/actions";

import { useServerAction } from "@/hooks/use-server-action";

import { ActionDialog } from "@ui/action-dialog";
import { Button } from "@ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import { P } from "@components/ui/typography";

import { ApprovedWebsiteButton } from "./approved-website-button";
import { AdminRejectForm } from "./reject-website-form";

export function PendingWebsitesTable({ websites }: { websites: Website[] }) {
  return (
    <Table key={websites.length}>
      <TableHeader>
        <TableRow>
          <TableHead className="">Ime</TableHead>
          <TableHead>Url</TableHead>
          <TableHead>Image</TableHead>
          <TableHead>Kategorija</TableHead>
          <TableHead>Still</TableHead>
          <TableHead>Boje</TableHead>
          <TableHead className="text-right">Odobravanje</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {websites.map((website) => (
          <TableRow key={website.id}>
            <TableCell className="font-medium">
              <P className="w-fit cursor-pointer">{website.name}</P>
            </TableCell>
            <TableCell>
              <Link href={website.url} target="_blank" className="underline">
                Idi na stranicu
              </Link>
            </TableCell>
            <TableCell>
              <Link
                href={website.imageUrl}
                target="_blank"
                className="underline"
              >
                Idi na sliku
              </Link>
            </TableCell>
            <TableCell>{website.category}</TableCell>
            <TableCell>{website.style}</TableCell>
            <TableCell>{website.colorStyle}</TableCell>
            <TableCell className="flex justify-end gap-2 text-right">
              <ApprovedWebsiteButton websiteId={website.id} />
              <ActionDialog
                title="Upiši razlog za odbijanje"
                description=""
                cta={
                  <Button variant="destructive" className="w-fit">
                    Odbij
                  </Button>
                }
              >
                <AdminRejectForm websiteId={website.id} />
              </ActionDialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
