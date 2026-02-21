"use client";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { useServerAction } from "@/hooks/use-server-action";

import { Button } from "@ui/button";
import { Card, CardContent } from "@ui/card";
import { FormInput } from "@ui/form-input";
import { FormTextarea } from "@ui/form-textarea";
import { Spinner } from "@ui/spinner";

import { sendSupportTicket } from "../actions";
import { HelpFormValues, helpSchema } from "../schema";

export function HelpForm() {
  const { isPending, action } = useServerAction(sendSupportTicket);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HelpFormValues>({
    resolver: zodResolver(helpSchema),
    defaultValues: {
      name: "",
      fromEmail: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(data: HelpFormValues) {
    action(data);
  }

  return (
    <Card className="w-full">
      <CardContent>
        <form
          id="help-contact-form"
          className="flex w-full flex-col gap-7"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-5 md:grid md:grid-cols-2">
            <FormInput
              label="Ime i prezime"
              {...register("name")}
              placeholder="Unesite svoje ime i prezime..."
              error={errors.name?.message}
            />

            <FormInput
              label="Tema"
              {...register("subject")}
              placeholder="Unesite temu..."
              error={errors.subject?.message}
            />

            <FormInput
              className="col-span-2"
              label="E-mail"
              {...register("fromEmail")}
              placeholder="Unesite svoj e-mail..."
              error={errors.fromEmail?.message}
            />

            <FormTextarea
              className="col-span-2"
              label="Poruka"
              {...register("message")}
              placeholder="Unesite poruku..."
              error={errors.message?.message}
            />
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="ml-auto w-35"
            form="help-contact-form"
          >
            {isPending ? <Spinner /> : "Pošalji poruku"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
