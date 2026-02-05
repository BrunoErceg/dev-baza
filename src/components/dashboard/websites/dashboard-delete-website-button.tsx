"use client";
import deleteWebsite from "@/actions/delete-website";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function DashboardDeleteWebsiteButton({ id, name }: { id: string; name: string }) {
  const router = useRouter();
  const handelDelete = async () => {
    const result = await deleteWebsite(id);
    if (result.success) {
      toast.success(result.success);
      router.refresh();
    }
    if (result.error) toast.error(result.error);
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
