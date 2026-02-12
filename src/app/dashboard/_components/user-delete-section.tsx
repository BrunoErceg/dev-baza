"use client";
import { signOut } from "next-auth/react";

import deleteUser from "@/actions/user-actions";

import { useServerAction } from "@/hooks/use-server-action";

import { Button } from "@/components/ui/button";

import { DashboardCard } from "./dashboard-card";
import { DashboardDialog } from "./dashboard-dialog";

export function UserDeleteSection() {
  const { isPending, action } = useServerAction(deleteUser, () =>
    signOut({ callbackUrl: "/" }),
  );

  const deleteAccount = async () => {
    action();
  };
  return (
    <DashboardCard
      title="Izbriši svoj račun"
      description="Trajno izbrišite svoj korisnički račun i sve povezane podatke (web stranice, lajkove). Ova radnja je nepovratna."
    >
      <DashboardDialog
        cta={
          <Button variant="destructive" className="w-fit">
            Izbriši račun
          </Button>
        }
        title="Jeste li potpuno sigurni?"
        description="Ova radnja je nepovratna. Vaš korisnički račun bit će trajno izbrisan, a svi povezani podaci uklonjeni s naših
                  poslužitelja."
      >
        <div className="flex justify-end">
          <Button
            disabled={isPending}
            variant="destructive"
            onClick={deleteAccount}
          >
            {isPending ? "Brisanje..." : "Izbriši račun"}
          </Button>
        </div>
      </DashboardDialog>
    </DashboardCard>
  );
}
