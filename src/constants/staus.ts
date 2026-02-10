import { WebsiteStatus } from "@prisma/client";
import { CheckCircle2, Clock, LucideIcon, XCircle } from "lucide-react";

export const WEBSITE_STATUS: Record<
  WebsiteStatus,
  { label: string; Icon: LucideIcon; color: string }
> = {
  PENDING: {
    label: "Na čekanju",
    Icon: Clock,
    color: "text-gray-600",
  },
  APPROVED: {
    label: "Odobreno",
    Icon: CheckCircle2,
    color: "text-green-800",
  },
  REJECTED: {
    label: "Odbijeno",
    Icon: XCircle,
    color: "text-red-600",
  },
};
