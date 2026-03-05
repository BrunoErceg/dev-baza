"use client";
import { useState } from "react";

import { cn } from "@lib/utils";
import { LayersPlus } from "lucide-react";

import { Button } from "@ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@ui/sheet";
import { Spinner } from "@ui/spinner";

import { AddWebsiteForm } from "./add-website-form";

export function AddWebsiteSheet({ className }: { className?: string }) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  return (
    <div className={cn(className)}>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button>
            <LayersPlus />
            <span className="hidden md:inline-block"> Dodaj web stranicu</span>
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[90vw] md:max-w-lg">
          <SheetHeader>
            <SheetTitle>Dodaj web stranicu</SheetTitle>
            <SheetDescription>Ispunite sva polja u nastavku</SheetDescription>
          </SheetHeader>

          <AddWebsiteForm
            onLoadingChange={(val) => setLoading(val)}
            onSuccess={() => setOpen(false)}
          />
          <SheetFooter>
            <div className="flex justify-end">
              <Button
                type="submit"
                form="form-add-website"
                disabled={loading}
                className="w-45"
              >
                {loading ? <Spinner /> : "Dodaj web stranicu"}
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
