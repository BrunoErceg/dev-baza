import { LayersPlus } from "lucide-react";

import { Button } from "@ui/button";
import { SheetTrigger } from "@ui/sheet";

export function AddWebsiteTrigger() {
  return (
    <SheetTrigger asChild>
      <Button>
        <LayersPlus />
        <span className="hidden md:inline-block"> Dodaj web stranicu</span>
      </Button>
    </SheetTrigger>
  );
}
