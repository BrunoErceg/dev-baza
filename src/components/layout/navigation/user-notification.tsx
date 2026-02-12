import { USER_NOTIFICATION_MAP } from "@/constants/notification";
import { Notification } from "@prisma/client";
import { Bell, BellOff } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Muted, P } from "@/components/ui/typography";

import { DeleteAllNotification } from "./delete-all-notification";

export function UserNotification({
  initialData,
}: {
  initialData: Notification[];
}) {
  const formatRelativeDate = (date: Date) => {
    const ageInDays = Math.floor(
      (new Date().getTime() - date.getTime()) / (1000 * 60 * 60 * 24),
    );
    if (ageInDays === 0) return "Danas";
    if (ageInDays === 1) return "Jučer";
    if (ageInDays === 2) return "Prekjučer";
    return `Prije ` + Math.abs(ageInDays) + ` dana`;
  };

  return (
    <HoverCard openDelay={10} closeDelay={200}>
      <HoverCardTrigger>
        <div className="relative cursor-pointer">
          <Bell className="size-8" />
          {initialData.length > 0 && (
            <div className="absolute top-0 right-0 size-2 rounded-full bg-red-500" />
          )}
        </div>
      </HoverCardTrigger>
      <HoverCardContent align="end" className="flex w-100 flex-col gap-2 p-3.5">
        {initialData.length === 0 ? (
          <div className="flex h-40 items-center justify-center">
            <Muted className="text-center text-base leading-tight">
              <BellOff className="mx-auto mb-3" />
              Tvoje obavijesti su na godišnjem
              <br /> odmoru. Uživaj u tišini.
            </Muted>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <P className="font-semibold">Obavijesti</P>
              <DeleteAllNotification />
            </div>

            <ScrollArea className="max-h-80 max-w-150 flex-col overflow-y-auto py-1 pr-4">
              <div className="flex flex-col gap-3">
                {initialData.map((notification) => {
                  const Icon = USER_NOTIFICATION_MAP[notification.type].Icon;

                  return (
                    <Alert
                      key={notification.id}
                      className={
                        USER_NOTIFICATION_MAP[notification.type].colors
                      }
                    >
                      <Icon />
                      <AlertTitle>{notification.message}</AlertTitle>
                      <AlertDescription>
                        {formatRelativeDate(notification.createdAt)}
                      </AlertDescription>
                    </Alert>
                  );
                })}
              </div>
            </ScrollArea>
          </>
        )}
      </HoverCardContent>
    </HoverCard>
  );
}
