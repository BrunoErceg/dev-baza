"use client";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export function DeleteWebsiteButton({ id, name }: { id: string; name: string }) {
  const handelDelete = () => {
    console.log("deleted website " + name + " sa id " + id);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Izbriši</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Izbriši web-stranicu</DialogTitle>
          <DialogDescription>Jeste li sigurni? Ova radnja je trajna i ne može se poništiti.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Ne</Button>
          </DialogClose>
          <Button onClick={() => handelDelete()} variant="destructive">
            Izbriši
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
