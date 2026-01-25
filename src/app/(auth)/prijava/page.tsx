"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/logo";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { Large } from "@/components/ui/typography";

const formSchema = z.object({
  email: z.string().email(),
});
const Login = () => {
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
      callbackUrl: "/profile",
    });
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="max-w-xs m-auto w-full flex flex-col items-center">
        <Logo />
        <Large className="mt-4">Prijavi se u Dev Bazu</Large>
        <Button onClick={() => signIn("google", { redirectTo: "/profile" })} className="mt-8 w-full gap-3">
          <GoogleLogo />
          Nastavi putem Googlea
        </Button>
        <Button onClick={() => signIn("github", { redirectTo: "/profile" })} className="mt-3 w-full gap-3">
          <GitHubLogo />
          Nastavi putem GitHuba
        </Button>

        <div className="my-7 w-full flex items-center justify-center overflow-hidden">
          <Separator />
          <span className="text-sm px-2">ili</span>
          <Separator />
        </div>

        <Form {...form}>
          <form className="w-full space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-adresa</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Email" className="w-full" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-4 w-full">
              Prijavi se
            </Button>
          </form>
        </Form>

        <div className="mt-5 space-y-5">
          <p className="text-sm text-center">
            Nemate račun?
            <Link href="/registracija" className="ml-1 underline text-muted-foreground">
              Registrirajte se
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

const GitHubLogo = () => (
  <Image src="/github-logo.svg" alt="GitHub" width={18} height={18} className="inline-block shrink-0 align-sub text-inherit size-lg" />
);

const GoogleLogo = () => (
  <Image src="/google-logo.svg" alt="GitHub" width={18} height={18} className="inline-block shrink-0 align-sub text-inherit size-lg" />
);

export default Login;
