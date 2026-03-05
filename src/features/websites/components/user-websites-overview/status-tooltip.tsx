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
  const label = WEBSITE_STATUS_MAP[status].label;
  const color = WEBSITE_STATUS_MAP[status].color;

  const displayText = {
    PENDING: `Stranica čeka pregled. Bit će javno vidljiva nakon odobrenja (obično unutar 48h).`,
    APPROVED:
      "Provjera uspješna. Vaša web stranica je sada javno vidljiva svim korisnicima.",
    REJECTED: `Razlog: ${rejectReason}`,
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Badge variant="outline" className={color}>
          <Icon />
          {label}
        </Badge>
      </TooltipTrigger>
      <TooltipContent>
        <p>{displayText[status]}</p>
      </TooltipContent>
    </Tooltip>
  );
}
