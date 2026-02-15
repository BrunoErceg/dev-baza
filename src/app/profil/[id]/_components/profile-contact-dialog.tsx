import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ProfileContactForm } from "./profile-contact-form";

export function ProfileContactDialog({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg">Kontakt</Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-10">
        <DialogHeader>
          <DialogTitle>Kontakt</DialogTitle>
          <DialogDescription>
            Ispunite sva polja u nastavku da kontaktirate {name}
          </DialogDescription>
        </DialogHeader>
        <ProfileContactForm profileEmail={email} />
      </DialogContent>
    </Dialog>
  );
}
