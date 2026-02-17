import { Controller, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { rejectWebsite } from "@features/admin/actions";

import { useServerAction } from "@/hooks/use-server-action";

import { Button } from "@ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@ui/field";
import { Input } from "@ui/input";
import { Spinner } from "@ui/spinner";

import { RejectReasonFormValues, rejectReasonSchema } from "../../schemas";

export function AdminRejectForm({ websiteId }: { websiteId: string }) {
  const { isPending, action } = useServerAction(rejectWebsite);

  const form = useForm<RejectReasonFormValues>({
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
        <Button type="submit" disabled={isPending} className="w-45">
          {isPending ? <Spinner /> : "Odbij i dodaj razlog"}
        </Button>
      </div>
    </form>
  );
}
