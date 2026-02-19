import { Controller, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { rejectWebsite } from "@features/admin/actions";

import { useServerAction } from "@/hooks/use-server-action";

import { Button } from "@ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@ui/field";
import { FormInput } from "@ui/form-input";
import { Input } from "@ui/input";
import { Spinner } from "@ui/spinner";

import { RejectReasonFormValues, rejectReasonSchema } from "../../schemas";

export function AdminRejectForm({ websiteId }: { websiteId: string }) {
  const { isPending, action } = useServerAction(rejectWebsite);

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
    action(websiteId, data);
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
