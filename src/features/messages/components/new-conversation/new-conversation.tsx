import { MessageCirclePlus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/dialog";

import { CandidateSearch } from "./candidate-search";

export function NewConversation() {
  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer">
        <MessageCirclePlus />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novi razgovor</DialogTitle>
          <DialogDescription></DialogDescription>
          <CandidateSearch />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
