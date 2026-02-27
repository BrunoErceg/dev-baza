import { Trash2 } from "lucide-react";

import { Button } from "@ui/button";
import { SheetFooter } from "@ui/sheet";

export function NotificationFooter({ onClear }: { onClear: () => void }) {
  return (
    <SheetFooter>
      <Button
        variant="link"
        className="text-destructive hover:text-destructive/80 cursor-pointer justify-start"
        onClick={() => onClear()}
      >
        <Trash2 size={10} />
        Obriši obavijesti
      </Button>
    </SheetFooter>
  );
}
