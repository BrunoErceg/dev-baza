"use client";

import { Notification } from "@prisma/client";
import { BellOff } from "lucide-react";

import { EmptyState } from "@ui/empty-state";
import { ErrorState } from "@ui/error-state";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@ui/sheet";

import { useNotifications } from "../hooks";
import { NotificationBell } from "./notification-bell";
import { NotificationFooter } from "./notification-footer";
import { NotificationList } from "./notification-list";

export function UserNotifications({
  initialNotifications,
  initialUnreadCount,
  error,
  userId,
}: {
  initialNotifications: Notification[];
  initialUnreadCount: number;
  error: string | null;
  userId: string;
}) {
  const { notifications, unreadCount, resetCount, onClearAll, hasData } =
    useNotifications({
      initialNotifications,
      initialUnreadCount,
      userId,
    });

  return (
    <Sheet>
      <SheetTrigger onClick={() => resetCount()}>
        <NotificationBell count={unreadCount} />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Obavijesti</SheetTitle>
          <SheetDescription>
            Budite u tijeku s najnovijim aktivnostima.
          </SheetDescription>
        </SheetHeader>

        {error ? (
          <ErrorState Icon={BellOff} description={error} />
        ) : !hasData ? (
          <EmptyState
            Icon={BellOff}
            title="Nema obavijesti"
            description="Tvoje obavijesti su na godišnjem odmoru. Uživaj u tišini."
          />
        ) : (
          <NotificationList notifications={notifications} />
        )}
        <NotificationFooter onClear={onClearAll} />
      </SheetContent>
    </Sheet>
  );
}
