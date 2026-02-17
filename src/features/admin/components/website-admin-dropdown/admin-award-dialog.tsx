import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@ui/dialog";

import { AddAwardForm } from "./add-award-form";

export function AdminAwardDialog({
  websiteId,
  isOpen,
  setIsDialogOpen,
}: {
  websiteId: string;
  isOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Dodaj Priznanje</DialogTitle>
          <DialogDescription>
            Popunite sva polja u nastavku kako biste dodali priznanje.
          </DialogDescription>
        </DialogHeader>
        <AddAwardForm websiteId={websiteId} />
      </DialogContent>
    </Dialog>
  );
}
