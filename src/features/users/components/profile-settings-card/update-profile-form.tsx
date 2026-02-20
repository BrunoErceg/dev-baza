"use client";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";

import { updateProfile } from "@features/users/actions";
import { ProfileFormValues, profileSchema } from "@features/users/schema";

import { Button } from "@ui/button";
import { Field } from "@ui/field";
import { FormInput } from "@ui/form-input";
import { FormTextarea } from "@ui/form-textarea";
import { Spinner } from "@ui/spinner";
import { Small } from "@ui/typography";

interface ProfileFormProps {
  user: {
    name: string | null;
    username: string | null;
    emailContact: string | null;
    website: string | null;
    bio: string | null;
  };
}

export function UpdateProfileForm({ user }: ProfileFormProps) {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name || "",
      username: user.username ?? "",
      email: user.emailContact ?? "",
      website: user.website ?? "",
      bio: user.bio ?? "",
    },
  });

  async function onSubmit(data: ProfileFormValues) {
    startTransition(async () => {
      const result = await updateProfile(data);

      if (result?.error) {
        setError("root", {
          type: "server",
          message: result.error,
        });
      }
    });
  }

  return (
    <>
      <form className="flex flex-col gap-7" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-5">
          <FormInput
            label="Ime i prezime"
            error={errors.name?.message}
            placeholder="Unesite ime..."
            id="name"
            {...register("name")}
          />

          <FormInput
            label="Korisničko ime"
            error={errors.username?.message}
            placeholder="Unesite korisničko ime..."
            id="username"
            {...register("username")}
          />

          <FormInput
            label="Kontakt e-mail"
            error={errors.email?.message}
            placeholder="Unesite e-mail kontakt ..."
            id="email"
            {...register("email")}
          />

          <FormInput
            label="Web stranica"
            error={errors.website?.message}
            placeholder="Unesite website..."
            id="website"
            {...register("website")}
          />

          <FormTextarea
            className="col-span-2"
            label="Opis"
            error={errors.bio?.message}
            placeholder="Unesite opis..."
            id="bio"
            {...register("bio")}
          />
        </div>
        {errors.root && (
          <Small className="text-destructive text-right">
            {errors.root.message}
          </Small>
        )}
        <Field orientation="horizontal">
          <Button type="submit" disabled={isPending} className="ml-auto w-25">
            {isPending ? <Spinner /> : "Spremi"}
          </Button>
        </Field>
      </form>{" "}
    </>
  );
}
