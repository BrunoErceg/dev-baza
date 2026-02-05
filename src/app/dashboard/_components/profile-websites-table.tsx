"use client";
import { useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Website } from "@prisma/client";
import deleteWebsite from "@/actions/delete-website";

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
import { DashboardDialog } from "./dashboard-dialog";
import { cn } from "@/lib/utils";

export function ProfileWebsiteTable({ websites }: { websites: Website[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="">Ime</TableHead>
          <TableHead>Url</TableHead>
          <TableHead>Status</TableHead>
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
            <TableCell>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge
                    variant="secondary"
                    className={cn(
                      "cursor-help",
                      website.status === "PENDING"
                        ? "bg-amber-200"
                        : "bg-green-300",
                    )}
                  >
                    {website.status}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  {website.status == "PENDING" ? (
                    <p>
                      Stranica je dodana i čeka pregled. Bit će javno
                      <br /> vidljiva nakon odobrenja (obično unutar 48h).
                    </p>
                  ) : (
                    <p>
                      Provjera uspješna. Vaša web stranica je sada javno
                      vidljiva svim korisnicima.
                    </p>
                  )}
                </TooltipContent>
              </Tooltip>
            </TableCell>
            <TableCell className="text-right">
              <DashboardDialog
                cta={<Button variant="destructive">Izbriši</Button>}
                title="Izbriši web-stranicu"
                description="Jeste li sigurni? Ova radnja je trajna i ne može se poništiti."
              >
                <Button
                  onClick={() => handleDelete(website.id)}
                  disabled={isPending}
                  variant="destructive"
                >
                  {isPending ? "Brisanje..." : "Izbriši"}
                </Button>
              </DashboardDialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
