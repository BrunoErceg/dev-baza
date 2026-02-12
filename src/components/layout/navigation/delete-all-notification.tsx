"use client";

import { useSession } from "next-auth/react";
import { useTransition } from "react";

import { deleteAllNotifications } from "@/actions/notification-actions";
import { is } from "zod/v4/locales";

import { useServerAction } from "@/hooks/use-server-action";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export function DeleteAllNotification() {
  const [isPending, startTransition] = useTransition();
  const handelDelete = () =>
    startTransition(async () => {
      await deleteAllNotifications();
    });
  return (
    <Button
      variant="link"
      className="cursor-pointer underline"
      onClick={() => handelDelete()}
    >
      {isPending && <Spinner />}
      Obriši sve
    </Button>
  );
}
