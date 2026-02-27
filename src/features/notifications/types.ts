import { Notification } from "@prisma/client";

export type UserNotificationsData = {
  notifications: Notification[];
  unreadCount: number;
};
