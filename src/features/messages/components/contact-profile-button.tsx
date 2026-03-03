"use client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { toast } from "sonner";

import { Button } from "@ui/button";
import { Spinner } from "@ui/spinner";

import { createConversation } from "../actions";

export function ContactProfileButton({ userId }: { userId: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handelNewConversation = async () => {
    startTransition(async () => {
      const { data, error } = await createConversation(userId);
      if (error) {
        toast.error(error);
      } else {
        router.push(`/poruke/${data?.id}`);
      }
    });
  };

  return (
    <Button
      size="lg"
      className="w-35"
      onClick={() => {
        handelNewConversation();
      }}
    >
      {isPending ? <Spinner /> : " Pošalji poruku"}
    </Button>
  );
}
