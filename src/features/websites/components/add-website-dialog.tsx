import { DialogTrigger } from "@radix-ui/react-dialog";
import { LayersPlus } from "lucide-react";

import { Button } from "@ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@ui/dialog";

import { AddWebsiteForm } from "./add-website-form";

export function AddWebsiteDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg">
          <LayersPlus />
          Dodaj web-stranicu
        </Button>
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
