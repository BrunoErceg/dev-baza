"use client";
import { useTransition } from "react";

import { Button } from "@ui/button";
import { Spinner } from "@ui/spinner";

import { deleteAllNotifications } from "../actions";

export function DeleteNotificationsButton() {
  const [isPending, startTransition] = useTransition();
  const handelDelete = () =>
    startTransition(async () => {
      await deleteAllNotifications();
    });
  return (
    <Button
      variant="link"
      className="w-70 cursor-pointer justify-end underline"
      onClick={() => handelDelete()}
    >
      {isPending && <Spinner />}
      Obriši sve
    </Button>
  );
}
