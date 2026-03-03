"use client";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";

import { sendMessage } from "@features/messages/actions";
import { useChat } from "@features/messages/hooks/use-chat";
import { MessageFormValues, messageSchema } from "@features/messages/schema";

import { Button } from "@ui/button";
import { FormInput } from "@ui/form-input";
import { Spinner } from "@ui/spinner";

export function ChatFooter() {
  const { activeChatId } = useChat();
  if (!activeChatId) return null;
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MessageFormValues>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = (data: MessageFormValues) => {
    startTransition(() => {
      sendMessage(activeChatId, data);
      reset();
    });
  };

  return (
    <div className="border-t p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4">
        <FormInput
          error={errors.message?.message}
          placeholder="Napišite poruku..."
          id="username"
          {...register("message")}
          autoComplete="off"
        />
        <Button type="submit" className="w-20">
          {isPending ? <Spinner /> : <Send />}
        </Button>
      </form>
    </div>
  );
}
