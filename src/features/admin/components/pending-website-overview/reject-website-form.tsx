import { useTransition } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { rejectWebsite } from "@features/admin/actions";

import { Button } from "@ui/button";
import { FormInput } from "@ui/form-input";
import { Spinner } from "@ui/spinner";

import { RejectReasonFormValues, rejectReasonSchema } from "../../schemas";

export function AdminRejectForm({ websiteId }: { websiteId: string }) {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RejectReasonFormValues>({
    resolver: zodResolver(rejectReasonSchema),
    defaultValues: {
      reason: "",
    },
  });

  async function onSubmit(data: RejectReasonFormValues) {
    startTransition(async () => {
      const { error } = await rejectWebsite(websiteId, data);

      if (error) {
        toast.error(error);
      } else {
        toast.success("Uspješno ste odbili web stranicu!");
      }
    });
  }

  return (
    <form
      id="form-reject-reason"
      className="flex flex-col gap-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormInput
        label="Razlog odbijanja"
        {...register("reason")}
        placeholder="primjer.com"
        error={errors.reason?.message}
      />

      <div className="flex justify-end">
        <Button type="submit" disabled={isPending} className="w-45">
          {isPending ? <Spinner /> : "Odbij i dodaj razlog"}
        </Button>
      </div>
    </form>
  );
}
