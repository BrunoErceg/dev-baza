import { AddWebsiteForm } from "../blocks/AddWebsiteForm";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
export function AddWebsite() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Dodaj web-stranicu</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[925px] flex flex-col gap-10">
        <DialogHeader>
          <DialogTitle>Dodaj web-stranicu</DialogTitle>
          <DialogDescription>Popunite sva polja u nastavku kako biste dodali novu web stranicu.</DialogDescription>
        </DialogHeader>
        <AddWebsiteForm />
      </DialogContent>
    </Dialog>
  );
}
