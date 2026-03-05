"use client";
import { signIn } from "next-auth/react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@ui/button";
import { FormInput } from "@ui/form-input";
import { Spinner } from "@ui/spinner";

import { LoginFormValues, loginSchema } from "../schema";

export function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
    startTransition(async () => {
      signIn("resend", {
        email: data.email,
        callbackUrl: "/dashboard",
      });
    });
  };

  return (
    <form className="w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        label="E-mail"
        error={errors.email?.message}
        id="email"
        placeholder="primjer@gmail.com"
        {...register("email")}
      />
      <Button disabled={isPending} type="submit" className="mt-4 w-full">
        {isPending ? <Spinner /> : " Nastavi s E-mailom"}
      </Button>
    </form>
  );
}
