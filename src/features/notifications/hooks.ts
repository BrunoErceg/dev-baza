import { useEffect, useState } from "react";

import { pusherClient } from "@lib/pusher";
import { Notification } from "@prisma/client";
import { toast } from "sonner";

import { deleteAllNotifications, setAllNotificationsAsRead } from "./actions";

interface useNotificationProps {
  initialNotifications: Notification[];
  initialUnreadCount: number;
  userId: string;
}

export function useNotifications({
  initialNotifications,
  initialUnreadCount,
  userId,
}: useNotificationProps) {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [unreadCount, setUnreadCount] = useState(initialUnreadCount);

  useEffect(() => {
    const channel = pusherClient.subscribe(`user-notifications-${userId}`);
    channel.bind("new-notification", (newNotif: Notification) => {
      toast("Nova obavijest", { description: newNotif.message });
      setNotifications((prev) => [{ ...newNotif }, ...prev]);
      setUnreadCount((prev) => prev + 1);
    });
    return () => {
      pusherClient.unsubscribe(`user-${userId}`);
    };
  }, [userId]);

  const resetCount = async () => {
    setUnreadCount(0);
    await setAllNotificationsAsRead();
  };

  const onClearAll = async () => {
    setNotifications([]);
    await deleteAllNotifications();
  };

  const hasData = notifications.length > 0;

  return { notifications, unreadCount, resetCount, onClearAll, hasData };
}
