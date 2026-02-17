import { WebsiteStatus } from "@prisma/client";

import { WEBSITE_STATUS_MAP } from "@features/websites/constants";

import { Badge } from "@ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@ui/tooltip";

export function StatusTooltip({
  status,
  rejectReason,
}: {
  status: WebsiteStatus;
  rejectReason?: string | null;
}) {
  const Icon = WEBSITE_STATUS_MAP[status].Icon;
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Badge variant="outline" className={WEBSITE_STATUS_MAP[status].color}>
          <Icon />
          {WEBSITE_STATUS_MAP[status].label}{" "}
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
}
