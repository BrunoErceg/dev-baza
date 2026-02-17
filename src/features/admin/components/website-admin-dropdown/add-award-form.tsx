import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useServerAction } from "@hooks/use-server-action";
import { cn } from "@lib/utils";

import { awardWebsite } from "@features/admin/actions";
import { AwardFormValues, awardSchema } from "@features/admin/schemas";

import { Button } from "@ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@ui/field";
import { Input } from "@ui/input";
import { Spinner } from "@ui/spinner";

export function AddAwardForm({ websiteId }: { websiteId: string }) {
  const form = useForm<AwardFormValues>({
    resolver: zodResolver(awardSchema),
    defaultValues: {
      award: "",
    },
  });

  const { isPending, action } = useServerAction(awardWebsite);

  async function onSubmit(data: AwardFormValues) {
    action(websiteId, data);
  }
  return (
    <form
      id="form-award-website"
      className="flex flex-col gap-5"
      onSubmit={form.handleSubmit(onSubmit, (errors) =>
        console.log("Validation Errors:", errors),
      )}
    >
      <FieldGroup>
        <Field data-invalid={!!form.formState.errors.award}>
          <FieldLabel htmlFor="award">Opis Priznanja</FieldLabel>
          <Input
            {...form.register("award")} // Ovo mijenja cijeli Controller blok
            id="award"
            placeholder="Unesite priznanje..."
            autoComplete="off"
          />
          {form.formState.errors.award && (
            <FieldError errors={[form.formState.errors.award]} />
          )}
        </Field>
      </FieldGroup>
      <Button
        disabled={isPending}
        form="form-award-website"
        className={cn("ml-auto w-25")}
        type="submit"
      >
        {isPending ? <Spinner /> : "Dodaj"}
      </Button>
    </form>
  );
}
