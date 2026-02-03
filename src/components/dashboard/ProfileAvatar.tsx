import { AvatarForm } from "../blocks/AvatarForm";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import Image from "next/image";
export async function ProfileAvatar({ image }: { image: string }) {
  return (
    <Dialog>
      <DialogTrigger>
        <Avatar className="w-30 h-30 cursor-pointer">
          <AvatarImage src={image} />
        </Avatar>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Promijenite svoju sliku profila.</DialogTitle>
          <DialogDescription>Promjene će biti vidljive na vašim objavama i profilu.</DialogDescription>
        </DialogHeader>
        <AvatarForm />
      </DialogContent>
    </Dialog>
  );
}
