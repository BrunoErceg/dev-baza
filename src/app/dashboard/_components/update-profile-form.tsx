"use client";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { updateProfile } from "@/actions/update-user";
import { User } from "@prisma/client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  name: z
    .string()
    .min(3, "Ime mora imati barem 3 znaka.")
    .max(32, "Ime može imati najviše 32 znaka."),
  phone: z
    .string()
    .min(3, "Broj mora imati barem 3 znaka.")
    .max(32, "Broj može imati najviše 32 znaka.")
    .optional(),
  email: z.email().optional(),
  website: z.url("Unesite ispravnu URL adresu.").optional(),
  company: z
    .string()
    .min(3, "Ime kompanije mora imati barem 3 znaka.")
    .max(32, "Ime kompanije može imati najviše 32 znaka.")
    .optional(),
});
export type profileFormValues = z.infer<typeof formSchema>;
export function UpdateProfileForm({ user }: { user: User }) {
  const { update } = useSession();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name ?? "",
      phone: user.number ?? "",
      email: user.emailContact ?? "",
      website: user.website ?? "",
      company: user.company ?? "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const result = await updateProfile(data);
      if (result.success) {
        await update({ name: data.name });
        router.refresh();
        toast.success(result.success);
      } else if (result.error) {
        toast.error(result.error);
      }
    });
  }

  return (
    <form
      id="form-change-name"
      className="flex flex-col gap-7"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div className="grid gap-5 grid-cols-2">
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

        {/* Company Name */}
        <FieldGroup>
          <Controller
            name="company"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-change-company">
                  Ime Kompanije
                </FieldLabel>
                <Input
                  {...field}
                  id="form-change-company"
                  aria-invalid={fieldState.invalid}
                  placeholder="Unesite novi naziv kompanije"
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
                  Web-stranice
                </FieldLabel>
                <Input
                  {...field}
                  id="form-change-website"
                  aria-invalid={fieldState.invalid}
                  placeholder="Unesite novi url web-stranice"
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
