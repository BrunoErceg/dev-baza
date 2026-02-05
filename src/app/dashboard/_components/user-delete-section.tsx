"use client";
import { useTransition } from "react";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import deleteUser from "@/actions/delete-user";

import { Button } from "@/components/ui/button";
import { DashboardCard } from "./dashboard-card";
import { DashboardDialog } from "./dashboard-dialog";

export function UserDeleteSection() {
  const [isPending, startTransition] = useTransition();
  const deleteAccount = async () => {
    startTransition(async () => {
      const result = await deleteUser();
      if (result.success) {
        signOut({ callbackUrl: "/" });
      } else if (result.error) toast.error(result.error);
    });
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
