import { useForm } from "react-hook-form";

import { signIn } from "@/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { Button } from "@ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/form";
import { Input } from "@ui/input";

import { LoginFormValues, loginSchema } from "../schema";

export function LoginForm() {
  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    await signIn("resend", {
      email: data.email,
      callbackUrl: "/dashboard",
    });
  };
  return (
    <Form {...form}>
      <form className="w-full space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
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
          Prijavi se
        </Button>
      </form>
    </Form>
  );
}
