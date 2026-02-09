import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { rejectWebsite } from "@/actions/admin-actions";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { RejectReasonFormValues, rejectReasonSchema } from "@/lib/schemas";

import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function AdminRejectForm({ websiteId }: { websiteId: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<RejectReasonFormValues>({
    resolver: zodResolver(rejectReasonSchema),
    defaultValues: {
      reason: "",
    },
  });
  async function onSubmit(data: RejectReasonFormValues) {
    startTransition(async () => {
      console.log(data.reason);
      const result = await rejectWebsite(websiteId, data);
      if (result.success) {
        toast.success(result.success);
        router.refresh();
      } else if (result.error) {
        toast.error(result.error);
      }
    });
  }

  return (
    <form
      id="form-reject-reason"
      className="flex flex-col gap-5"
      onSubmit={form.handleSubmit(onSubmit, (errors) =>
        console.log("Validation Errors:", errors),
      )}
    >
      <FieldGroup>
        <Controller
          name="reason"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="reject-reason">Razlog Odbijanja</FieldLabel>
              <Input
                {...field}
                id="reject-reason"
                aria-invalid={fieldState.invalid}
                placeholder="Unesite razlog..."
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <div className="flex justify-end">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Spremanje..." : "Odbij i dodaj razlog"}
        </Button>
      </div>
    </form>
  );
}
