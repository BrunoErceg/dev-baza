import { NotificationType } from "@prisma/client";
import { CheckCircle2, Heart, Info, LucideIcon, XCircle } from "lucide-react";

export const USER_NOTIFICATION_MAP: Record<
  NotificationType,
  { Icon: LucideIcon; twClass: string }
> = {
  POSITIVE: {
    Icon: CheckCircle2,
    twClass: "bg-gray-100",
  },
  NEGATIVE: {
    Icon: XCircle,
    twClass: "border-red-200 bg-red-50 text-red-900",
  },
  NEUTRAL: {
    Icon: Info,
    twClass: "bg-gray-100",
  },
  LIKE: {
    Icon: Heart,
    twClass: "bg-gray-100",
  },
};
