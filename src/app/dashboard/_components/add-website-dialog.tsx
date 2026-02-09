import { Button } from "@/components/ui/button";
import { AddWebsiteForm } from "./add-website-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
export function AddWebsiteDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Dodaj web-stranicu</Button>
      </DialogTrigger>
      <DialogContent className="lg:max-w-200">
        <DialogHeader>
          <DialogTitle>Dodaj web-stranicu</DialogTitle>
          <DialogDescription>
            Popunite sva polja u nastavku kako biste dodali novu web stranicu.
          </DialogDescription>
        </DialogHeader>
        <AddWebsiteForm />
      </DialogContent>
    </Dialog>
  );
}
