"use client";
import { useSession } from "next-auth/react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

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
    website: string | null;
    bio: string | null;
  };
}

export function UpdateProfileForm({ user }: ProfileFormProps) {
  const [isPending, startTransition] = useTransition();
  const { update } = useSession();
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
      website: user.website ?? "",
      bio: user.bio ?? "",
    },
  });

  async function onSubmit(data: ProfileFormValues) {
    startTransition(async () => {
      const { data: updatedUser, error } = await updateProfile(data);

      if (error) {
        setError("root", {
          type: "server",
          message: error,
        });
      } else if (updatedUser) {
        await update({
          username: updatedUser.username,
          name: updatedUser.name,
        });
        toast.success("Uspješno ste ažurirali profil!");
      }
    });
  }

  return (
    <>
      <form className="flex flex-col gap-7" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-10 md:grid md:grid-cols-2 md:gap-5">
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
            label="Web stranica"
            error={errors.website?.message}
            placeholder="Unesite website..."
            id="website"
            className="col-span-2"
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
