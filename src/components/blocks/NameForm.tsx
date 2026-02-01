"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { updateUsername } from "@/actions/update-user";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const formSchema = z.object({
  name: z
    .string()
    .min(3, "Ime mora imati barem 3 znaka.")
    .max(32, "Ime može imati najviše 32 znaka.")
    .regex(/^[a-zA-ZčćžšđČĆŽŠĐ]+\s+[a-zA-ZčćžšđČĆŽŠĐ]+.*$/, "Unesite ispravno ime i prezime (razmak između)."),
});

export function NameForm() {
  const { update } = useSession();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const name = data.name;
    const result = await updateUsername(name);
    if (result.success) {
      await update({ name: data.name });
      router.refresh();
      toast.success(result.success);
    }
    if (result.error) toast.error(result.error);
  }

  return (
    <form id="form-change-name" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-change-name">Promijeni ime</FieldLabel>
              <Input {...field} id="form-change-name" aria-invalid={fieldState.invalid} placeholder="Unesite novo ime" autoComplete="off" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Field orientation="horizontal">
          <Button type="submit" form="form-change-name">
            Spremi
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
