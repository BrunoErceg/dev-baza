import { Logo } from "@/components/logo";
import { cn } from "@lib/utils";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Menu } from "lucide-react";

import { Button } from "@ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@ui/sheet";

import { MobileNavMenu } from "./mobile-nav-menu";

export const NavigationSheet = ({ className }: { className?: string }) => {
  return (
    <div className={cn(className)}>
      <Sheet>
        <VisuallyHidden>
          <SheetTitle>Navigation Menu</SheetTitle>
        </VisuallyHidden>

        <SheetTrigger asChild>
          <Button size="icon" variant="ghost">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="px-6 py-3">
          <Logo />
          <MobileNavMenu />
        </SheetContent>
      </Sheet>
    </div>
  );
};
