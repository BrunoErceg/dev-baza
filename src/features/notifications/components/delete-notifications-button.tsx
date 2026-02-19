"use client";
import { useTransition } from "react";

import { Delete, Trash2 } from "lucide-react";

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
      className="w-70 -translate-x-1 cursor-pointer justify-end"
      onClick={() => handelDelete()}
    >
      Obriši sve{isPending ? <Spinner /> : <Trash2 size={10} />}
    </Button>
  );
}
