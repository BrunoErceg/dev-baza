"use client";
import { useState } from "react";

import { cn } from "@lib/utils";

import { Sheet } from "@ui/sheet";
import { Spinner } from "@ui/spinner";

import { AddWebsiteContent } from "./add-website-content";
import { AddWebsiteFooter } from "./add-website-footer";
import { AddWebsiteForm } from "./add-website-form";
import { AddWebsiteTrigger } from "./add-website-trigger";

export function AddWebsite({ className }: { className?: string }) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  return (
    <div className={cn(className)}>
      <Sheet open={open} onOpenChange={setOpen}>
        <AddWebsiteTrigger />

        <AddWebsiteContent>
          <AddWebsiteForm
            onLoadingChange={setLoading}
            onClose={() => setOpen(false)}
          />
          <AddWebsiteFooter loading={loading} />
        </AddWebsiteContent>
      </Sheet>
    </div>
  );
}
