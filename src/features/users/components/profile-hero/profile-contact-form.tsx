"use client";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { sendMailToProfile } from "@features/users/actions";
import {
  ProfileContactFormValues,
  profileContactSchema,
} from "@features/users/schema";

import { useServerAction } from "@/hooks/use-server-action";

import { Button } from "@ui/button";
import { FormInput } from "@ui/form-input";
import { FormTextarea } from "@ui/form-textarea";
import { Spinner } from "@ui/spinner";

export function ProfileContactForm({ profileEmail }: { profileEmail: string }) {
  const { isPending, action } = useServerAction(sendMailToProfile);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ProfileContactFormValues>({
    resolver: zodResolver(profileContactSchema),
    defaultValues: {
      name: "",
      fromEmail: "",
      toEmail: profileEmail,
      subject: "",
      message: "",
    },
  });

  async function onSubmit(data: ProfileContactFormValues) {
    action(data);
  }

  return (
    <form
      id="profile-contact-form"
      className="grid grid-cols-2 gap-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormInput
        label="Ime i prezime"
        {...register("name")}
        placeholder="Unesite ime i prezime..."
        error={errors.name?.message}
      />

      <FormInput
        label="Tema"
        {...register("subject")}
        placeholder="Unesite temu..."
        error={errors.subject?.message}
      />

      <FormInput
        label="E-mail"
        {...register("fromEmail")}
        placeholder="Unesite e-mail..."
        className="col-span-2"
        error={errors.fromEmail?.message}
      />

      <FormTextarea
        label="Poruka"
        {...register("message")}
        placeholder="Unesite poruku..."
        className="col-span-2"
        error={errors.message?.message}
      />

      <Button
        type="submit"
        disabled={isPending}
        className="col-span-2 ml-auto w-35"
        form="profile-contact-form"
      >
        {isPending ? <Spinner /> : "Pošalji poruku"}
      </Button>
    </form>
  );
}
