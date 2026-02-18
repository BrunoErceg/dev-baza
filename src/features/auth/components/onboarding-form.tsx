import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@ui/button";
import { FormInput } from "@ui/form-input";
import { Spinner } from "@ui/spinner";

import { updateUserName } from "../actions";
import { OnboardingFormValues, onboardingSchema } from "../schema";

export function OnboardingForm() {
  const router = useRouter();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      userName: "",
    },
  });

  const onSubmit = async (data: OnboardingFormValues) => {
    startTransition(async () => {
      const result = await updateUserName(data);
      if (result?.error) {
        setError("userName", {
          type: "server",
          message: result.error,
        });
      } else if (result?.success) {
        await update({ userName: data.userName });

        router.push("/dashboard");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <FormInput
        label="Korisničko ime"
        error={errors.userName?.message}
        placeholder="Unesite korisničko ime..."
        id="username"
        {...register("userName")}
      />
      <Button className="w-full">{isPending ? <Spinner /> : "Nastavi"}</Button>
    </form>
  );
}
