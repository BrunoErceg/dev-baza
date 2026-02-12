import { useForm } from "react-hook-form";

import { awardWebsite } from "@/actions/website-actions";
import { zodResolver } from "@hookform/resolvers/zod";

import { useServerAction } from "@/hooks/use-server-action";
import { AwardFormValues, awardSchema } from "@/lib/schemas";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function AdminAwardDialog({
  websiteId,
  isOpen,
  setIsDialogOpen,
}: {
  websiteId: string;
  isOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
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
    <Dialog open={isOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Dodaj Priznanje</DialogTitle>
          <DialogDescription>
            Popunite sva polja u nastavku kako biste dodali priznanje.
          </DialogDescription>
        </DialogHeader>
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
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Odustani</Button>
          </DialogClose>
          <Button disabled={isPending} form="form-award-website" type="submit">
            {isPending ? "Dodavanje..." : "Dodaj"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
