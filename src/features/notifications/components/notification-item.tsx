import { Notification } from "@prisma/client";

import { Alert, AlertDescription, AlertTitle } from "@ui/alert";

import { USER_NOTIFICATION_MAP } from "../constants";
import { formatRelativeDate } from "../utils";

export function NotificationItem(notification: Notification) {
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
}
