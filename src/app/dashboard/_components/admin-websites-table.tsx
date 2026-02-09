"use client";

import { Website } from "@prisma/client";
import Link from "next/link";
import { toast } from "sonner";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { acceptWebsite, rejectWebsite } from "@/actions/admin-actions";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import { P } from "@components/ui/typography";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { DashboardDialog } from "./dashboard-dialog";
import { AdminRejectForm } from "./admin-reject-form";

export function AdminWebsitesTable({ websites }: { websites: Website[] }) {
  const router = useRouter();

  const handleAction = async (websiteId: string) => {
    {
      const result = await acceptWebsite(websiteId);
      if (result.success) {
        toast.success(result.success);
        router.refresh();
      } else if (result.error) {
        toast.error(result.error);
      }
    }
  };

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

            <TableCell className="text-right flex gap-2 justify-end">
              <Button onClick={() => handleAction(website.id)}>Odobri</Button>
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
