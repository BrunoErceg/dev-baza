import { Notification } from "@prisma/client";
import { BellOff } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@ui/sheet";
import { Muted } from "@ui/typography";

import { DeleteNotificationsButton } from "./delete-notifications-button";
import { NotificationBell } from "./notification-bell";
import { NotificationItem } from "./notification-item";

const EmptyNotifications = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <Muted className="text-center text-base leading-tight">
        <BellOff className="mx-auto mb-3" />
        Tvoje obavijesti su na godišnjem
        <br /> odmoru. Uživaj u tišini.
      </Muted>
    </div>
  );
};

export function UserNotifications({
  initialData,
}: {
  initialData: { notifications: Notification[]; unreadCount: number };
}) {
  const { notifications, unreadCount } = initialData;
  const hasData = notifications.length > 0;
  return (
    <>
      <Sheet>
        <SheetTrigger>
          <NotificationBell unreadCount={unreadCount} />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Obavijesti</SheetTitle>
            <SheetDescription>
              Budite u tijeku s najnovijim aktivnostima.{" "}
            </SheetDescription>
          </SheetHeader>

          {!hasData ? (
            <EmptyNotifications />
          ) : (
            <div className="flex flex-col gap-3 px-4">
              {notifications.map((notification) => (
                <NotificationItem key={notification.id} {...notification} />
              ))}
            </div>
          )}
          <SheetFooter>
            <DeleteNotificationsButton />
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
