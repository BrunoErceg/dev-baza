"use client";
import { Controller, useForm } from "react-hook-form";

import { sendMailToAdmin, sendMailToProfile } from "@/actions/email-actions";
import { zodResolver } from "@hookform/resolvers/zod";

import { useServerAction } from "@/hooks/use-server-action";
import {
  ContactFormValues,
  HelpFormValues,
  ProfileFormValues,
  contactSchema,
  helpSchema,
} from "@/lib/schemas";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function HelpForm() {
  const { isPending, action } = useServerAction(sendMailToAdmin);

  const form = useForm<HelpFormValues>({
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
    <form
      id="help-contact-form"
      className="flex w-full flex-col gap-7"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-5">
        <div className="flex gap-5">
          {/* Name */}
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-change-name">
                    Ime i prezime
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-change-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Unesite svoje ime i prezime"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          {/* Subject */}
          <FieldGroup>
            <Controller
              name="subject"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-change-subject">Tema</FieldLabel>
                  <Input
                    {...field}
                    id="form-change-subject"
                    aria-invalid={fieldState.invalid}
                    placeholder="Unesite temu"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </div>
        {/* Email */}
        <FieldGroup>
          <Controller
            name="fromEmail"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-change-email">E-mail</FieldLabel>
                <Input
                  {...field}
                  id="form-change-email"
                  aria-invalid={fieldState.invalid}
                  placeholder="Unesite svoj e-mail"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        {/* Message */}
        <FieldGroup>
          <Controller
            name="message"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-change-message">Poruka</FieldLabel>
                <Textarea
                  {...field}
                  id="form-change-message"
                  aria-invalid={fieldState.invalid}
                  className="min-h-30"
                  placeholder="Poruka..."
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </div>
      <Field orientation="horizontal">
        <Button
          type="submit"
          disabled={isPending}
          className="ml-auto"
          form="help-contact-form"
        >
          {isPending ? "Slanje" : "Pošalji poruku"}
        </Button>
      </Field>
    </form>
  );
}
