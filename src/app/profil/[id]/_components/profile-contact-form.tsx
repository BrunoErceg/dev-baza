"use client";
import { Controller, useForm } from "react-hook-form";

import { sendMailToProfile } from "@/actions/email-actions";
import { zodResolver } from "@hookform/resolvers/zod";

import { useServerAction } from "@/hooks/use-server-action";
import {
  ContactFormValues,
  ProfileFormValues,
  contactSchema,
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

export function ProfileContactForm({ profileEmail }: { profileEmail: string }) {
  const { isPending, action } = useServerAction(sendMailToProfile);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      fromEmail: "",
      toEmail: profileEmail,
      subject: "",
      message: "",
    },
  });

  async function onSubmit(data: ProfileFormValues) {
    action(data);
  }

  return (
    <form
      id="profile-contact-form"
      className="flex flex-col gap-7"
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
          form="profile-contact-form"
        >
          {isPending ? "Slanje" : "Pošalji poruku"}
        </Button>
      </Field>
    </form>
  );
}
