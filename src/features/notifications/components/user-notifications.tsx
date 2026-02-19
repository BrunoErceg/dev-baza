import { ReactNode } from "react";

import { Notification } from "@prisma/client";
import { Bell, BellOff } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@ui/alert";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@ui/hover-card";
import { ScrollArea } from "@ui/scroll-area";
import { Muted, P } from "@ui/typography";

import { USER_NOTIFICATION_MAP } from "../constants";
import { formatRelativeDate } from "../utils";
import { DeleteNotificationsButton } from "./delete-notifications-button";

const NotificationBell = ({ hasData }: { hasData: boolean }) => {
  return (
    <div className="relative cursor-pointer">
      <Bell className="size-8" />
      {hasData && (
        <div className="absolute top-0 right-0 size-2 rounded-full bg-red-500" />
      )}
    </div>
  );
};

const EmptyNotifications = () => {
  return (
    <div className="flex h-40 items-center justify-center">
      <Muted className="text-center text-base leading-tight">
        <BellOff className="mx-auto mb-3" />
        Tvoje obavijesti su na godišnjem
        <br /> odmoru. Uživaj u tišini.
      </Muted>
    </div>
  );
};

const NotificationHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <P className="text-base font-semibold">Obavijesti</P>
      <DeleteNotificationsButton />
    </div>
  );
};

const NotificationContent = ({ children }: { children: ReactNode }) => {
  return (
    <ScrollArea className="max-h-80 max-w-150 flex-col overflow-y-auto py-1 pr-4">
      <div className="flex flex-col gap-3">{children}</div>
    </ScrollArea>
  );
};

const NotificationItem = (notification: Notification) => {
  const { Icon, twClass } = USER_NOTIFICATION_MAP[notification.type];
  return (
    <Alert className={twClass}>
      <Icon />
      <AlertTitle>{notification.message}</AlertTitle>
      <AlertDescription>
        {formatRelativeDate(notification.createdAt)}
      </AlertDescription>
    </Alert>
  );
};

export function UserNotifications({
  initialData,
}: {
  initialData: Notification[];
}) {
  const hasData = initialData.length > 0 ? true : false;
  return (
    <HoverCard openDelay={10} closeDelay={200}>
      <HoverCardTrigger>
        <NotificationBell hasData={hasData} />
      </HoverCardTrigger>
      <HoverCardContent align="end" className="flex w-100 flex-col gap-2 p-3.5">
        {!hasData ? (
          <EmptyNotifications />
        ) : (
          <>
            <NotificationHeader />
            <NotificationContent>
              {initialData.map((notification) => (
                <NotificationItem key={notification.id} {...notification} />
              ))}
            </NotificationContent>
          </>
        )}
      </HoverCardContent>
    </HoverCard>
  );
}
