"use client";

import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";

import { Logo } from "@/components/logo";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@ui/button";
import { Card } from "@ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/form";
import { Input } from "@ui/input";
import { Separator } from "@ui/separator";
import { Large } from "@ui/typography";

const formSchema = z.object({
  email: z.string().email(),
});
const Register = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // Dodajemo email iz forme u signIn metodu
    await signIn("resend", {
      email: data.email,
      callbackUrl: "/dashboard",
    });
  };

  return (
    <div className="flex items-center justify-center py-[10%]">
      <Card className="m-auto flex w-full max-w-md flex-col items-center px-10">
        <Logo />
        <Large>Registriraj se u Dev Bazu</Large>
        <Button
          onClick={() => signIn("google", { redirectTo: "/dashboard" })}
          className="w-full gap-3"
        >
          <GoogleLogo />
          Nastavi putem Googlea
        </Button>
        <Button
          onClick={() => signIn("github", { redirectTo: "/dashboard" })}
          className="w-full gap-3"
        >
          <GitHubLogo />
          Nastavi putem GitHuba
        </Button>

        <div className="flex w-full items-center justify-center overflow-hidden">
          <Separator />
          <span className="px-2 text-sm">ili</span>
          <Separator />
        </div>

        <Form {...form}>
          <form
            className="w-full space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-adresa</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email"
                      className="w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-4 w-full">
              Registriraj se
            </Button>
          </form>
        </Form>

        <div className="mt-5 space-y-5">
          <p className="text-center text-sm">
            Imaš račun?
            <Link
              href="/prijava"
              className="text-muted-foreground ml-1 underline"
            >
              Prijavi se
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

const GitHubLogo = () => (
  <Image
    src="/github-logo.svg"
    alt="GitHub"
    width={18}
    height={18}
    className="size-lg inline-block shrink-0 align-sub text-inherit"
  />
);

const GoogleLogo = () => (
  <Image
    src="/google-logo.svg"
    alt="GitHub"
    width={18}
    height={18}
    className="size-lg inline-block shrink-0 align-sub text-inherit"
  />
);

export default Register;
