"use client";
import { Bell } from "lucide-react";

export function NotificationBell({ count }: { count: number }) {
  return (
    <div className="relative cursor-pointer px-1!">
      <Bell className="size-6 md:size-8" />
      {count > 0 && (
        <div className="absolute top-0 right-0 size-3.5 rounded-full bg-red-500 text-[10px] text-white">
          {count}
        </div>
      )}
    </div>
  );
}
