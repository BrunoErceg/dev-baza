import { NotificationType } from "@prisma/client";
import { CheckCircle2, Heart, Info, LucideIcon, XCircle } from "lucide-react";

export const USER_NOTIFICATION_MAP: Record<
  NotificationType,
  { Icon: LucideIcon; twClass: string }
> = {
  POSITIVE: {
    Icon: CheckCircle2,
    twClass: "border-green-200 bg-green-50 text-green-900",
  },
  NEGATIVE: {
    Icon: XCircle,
    twClass: "border-red-200 bg-red-50 text-red-900",
  },
  NEUTRAL: {
    Icon: Info,
    twClass: "border-blue-200 bg-blue-50 text-blue-900",
  },
  LIKE: {
    Icon: Heart,
    twClass: "border-blue-200 bg-blue-50 text-blue-900",
  },
};
