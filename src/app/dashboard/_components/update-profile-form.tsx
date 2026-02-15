"use client";
import { Controller, useForm } from "react-hook-form";

import { updateUser } from "@/actions/user-actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";

import { useServerAction } from "@/hooks/use-server-action";
import { ProfileFormValues, profileSchema } from "@/lib/schemas";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function UpdateProfileForm({ user }: { user: User }) {
  const { isPending, action } = useServerAction(updateUser);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name,
      phone: user.phone ?? "",
      email: user.emailContact ?? "",
      website: user.website ?? "",
      bio: user.bio,
    },
  });

  async function onSubmit(data: ProfileFormValues) {
    action(data);
  }

  return (
    <form
      id="form-change-name"
      className="flex flex-col gap-7"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div className="grid grid-cols-2 gap-5">
        {/* Name */}
        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-change-name">Ime</FieldLabel>
                <Input
                  {...field}
                  id="form-change-name"
                  aria-invalid={fieldState.invalid}
                  placeholder="Unesite novo ime"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        {/* Phone Contact */}
        <FieldGroup>
          <Controller
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-change-phone">
                  Kontakt broj
                </FieldLabel>
                <Input
                  {...field}
                  id="form-change-phone"
                  aria-invalid={fieldState.invalid}
                  placeholder="Unesite novi broj"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        {/* Email Contact */}
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-change-email">
                  Kontakt e-mail
                </FieldLabel>
                <Input
                  {...field}
                  id="form-change-email"
                  aria-invalid={fieldState.invalid}
                  placeholder="Unesite novi email"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        {/* Website */}
        <FieldGroup>
          <Controller
            name="website"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-change-website">
                  Web-stranica
                </FieldLabel>
                <Input
                  {...field}
                  id="form-change-website"
                  aria-invalid={fieldState.invalid}
                  placeholder="Unesite url svoje web-stranice "
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        {/* Bio */}
        <FieldGroup className="col-span-2">
          <Controller
            name="bio"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-change-bio">Opis</FieldLabel>
                <Textarea
                  {...field}
                  id="form-change-bio"
                  aria-invalid={fieldState.invalid}
                  placeholder="Unesite opis o vama..."
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
        <Button type="submit" disabled={isPending} form="form-change-name">
          {isPending ? "Spremanje..." : "Spremi"}
        </Button>
      </Field>
    </form>
  );
}
