import { formatRelativeDate } from "@lib/utils";
import { Notification } from "@prisma/client";

import { Alert, AlertDescription, AlertTitle } from "@ui/alert";
import { ScrollArea } from "@ui/scroll-area";

import { USER_NOTIFICATION_MAP } from "../constants";

export function NotificationList({
  notifications,
}: {
  notifications: Notification[];
}) {
  return (
    <ScrollArea className="flex-1 overflow-auto">
      <div className="flex flex-col gap-3 px-3">
        {notifications.map((notification) => {
          const { Icon, twClass } = USER_NOTIFICATION_MAP[notification.type];
          const timeAgo = formatRelativeDate(notification.createdAt);
          return (
            <Alert key={notification.id} className={twClass}>
              <Icon />
              <AlertTitle>{notification.message}</AlertTitle>
              <AlertDescription>
                {timeAgo === "Upravo" ? "Upravo" : `Prije ${timeAgo}`}
              </AlertDescription>
            </Alert>
          );
        })}
      </div>
    </ScrollArea>
  );
}
