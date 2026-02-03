import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "../ui/table";
import { P } from "../ui/typography";
import Link from "next/link";
import Image from "next/image";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";
import { ButtonReject } from "./ButtonReject";
import { ButtonAccept } from "./ButtonAccept";
import { Website } from "@prisma/client";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "../ui/empty";
import { MdWebAsset } from "react-icons/md";

export function WebsitesApproval({ websites }: { websites: Website[] }) {
  return (
    <>
      {websites.length == 0 ? (
        <Card>
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <MdWebAsset />
              </EmptyMedia>
              <EmptyTitle>Nema web-stranica na čekanju</EmptyTitle>
              <EmptyDescription>
                Trenutno nema novih web stranica koje čekaju na tvoje odobrenje. Odmori se ili provjeri postojeće.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        </Card>
      ) : (
        <Card key={websites.length} className="relative rounded-4xl">
          <CardHeader>
            <CardTitle>Web stranice na čekanju</CardTitle>
            <CardDescription>Odobri web stranica</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
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

                    <TableCell className="text-right">
                      <ButtonAccept websiteId={website.id} />
                      <ButtonReject websiteId={website.id} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </>
  );
}
