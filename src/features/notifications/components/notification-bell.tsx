"use client";
import { Bell } from "lucide-react";

import { setAllNotificationsAsRead } from "../actions";

export function NotificationBell({ unreadCount }: { unreadCount: number }) {
  return (
    <div
      className="relative cursor-pointer px-1!"
      onClick={async () => setAllNotificationsAsRead()}
    >
      <Bell className="size-6 md:size-8" />
      {unreadCount > 0 && (
        <div className="absolute top-0 right-0 size-3.5 rounded-full bg-red-500 text-[10px] text-white">
          {unreadCount}
        </div>
      )}
    </div>
  );
}
