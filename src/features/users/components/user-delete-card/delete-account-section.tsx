"use client";
import { useTransition } from "react";

import { deleteAuthUser } from "@features/users/actions";

import { ActionDialog } from "@ui/action-dialog";
import { Button } from "@ui/button";
import { SectionCard } from "@ui/section-card";
import { Spinner } from "@ui/spinner";

export function DeleteAccountSection() {
  const [isPending, startTransition] = useTransition();
  const deleteAction = async () => {
    startTransition(async () => {
      await deleteAuthUser();
    });
  };

  return (
    <SectionCard
      title="Izbriši svoj račun"
      description="Trajno izbrišite svoj korisnički račun i sve povezane podatke (web stranice, lajkove). Ova radnja je nepovratna."
    >
      <ActionDialog
        cta={
          <Button variant="destructive" className="ml-auto w-fit">
            Izbriši račun
          </Button>
        }
        title="Jeste li potpuno sigurni?"
        description="Ova radnja je nepovratna. Vaš korisnički račun bit će trajno izbrisan, a svi povezani podaci uklonjeni s naših poslužitelja."
      >
        <Button
          disabled={isPending}
          variant="destructive"
          onClick={() => deleteAction()}
          className="ml-auto w-35"
        >
          {isPending ? <Spinner /> : "Izbriši račun"}
        </Button>
      </ActionDialog>
    </SectionCard>
  );
}
