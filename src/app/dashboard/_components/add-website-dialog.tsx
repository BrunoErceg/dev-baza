import { Button } from "@/components/ui/button";
import { AddWebsiteForm } from "./add-website-form";
import { DashboardDialog } from "./dashboard-dialog";
export function AddWebsiteDialog() {
  return (
    <DashboardDialog
      cta={<Button>Dodaj web-stranicu</Button>}
      title="Dodaj web-stranicu"
      description="Popunite sva polja u nastavku kako biste dodali novu web stranicu."
    >
      <AddWebsiteForm />
    </DashboardDialog>
  );
}
