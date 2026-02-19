"use client";
import { useState } from "react";

import { LayersPlus } from "lucide-react";

import { Button } from "@ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@ui/sheet";
import { Spinner } from "@ui/spinner";

import { AddWebsiteForm } from "./add-website-form";

export function AddWebsiteSheet() {
  const [loading, setLoading] = useState(false);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <LayersPlus />
          Dodaj web stranicu
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Dodaj web stranicu</SheetTitle>
          <SheetDescription>Ispunite sva polja u nastavku</SheetDescription>
        </SheetHeader>
        <div className="no-scrollbar overflow-y-auto px-4">
          <AddWebsiteForm onLoadingChange={(val) => setLoading(val)} />
        </div>
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
  );
}
