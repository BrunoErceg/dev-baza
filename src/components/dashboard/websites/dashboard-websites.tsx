import { getUserWebsites } from "@/data/websites";
import { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent } from "../../ui/card";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { MdWebAsset } from "react-icons/md";
import { DashboardAddWebsite } from "../dashboard-add-website";
import { Badge } from "../../ui/badge";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../../ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";
import Link from "next/link";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../../ui/hover-card";
import { P } from "../../ui/typography";
import Image from "next/image";
import { DashboardDeleteWebsiteButton } from "./dashboard-delete-website-button";

export async function DashboardWebsites({ userid }: { userid: string }) {
  const websites = await getUserWebsites(userid);

  return (
    <>
      {websites.length == 0 ? (
        <Card>
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <MdWebAsset />
              </EmptyMedia>
              <EmptyTitle>Još nema web stranica</EmptyTitle>
              <EmptyDescription>
                Još niste dodali nijednu web stranicu. Započnite tako što ćete dodati svoju prvu stranicu.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent className="flex-row justify-center gap-2">
              <DashboardAddWebsite />
            </EmptyContent>
          </Empty>
        </Card>
      ) : (
        <Card key={websites.length} className="relative rounded-4xl">
          <CardHeader>
            <CardTitle>Vaše web stranice</CardTitle>
            <CardDescription>Upravljajte svojim projektima.</CardDescription>
            <CardAction>
              <DashboardAddWebsite />
            </CardAction>
          </CardHeader>
          <CardContent>
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
                          <Badge variant="secondary" className="cursor-help bg-amber-200">
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
                            <p>Provjera uspješna. Vaša web stranica je sada javno vidljiva svim korisnicima.</p>
                          )}
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>
                    <TableCell className="text-right">
                      <DashboardDeleteWebsiteButton id={website.id} name={website.name} />
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
