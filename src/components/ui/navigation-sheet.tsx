import { Logo } from "@/components/logo";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Menu } from "lucide-react";

import { Button } from "@ui/button";
import { NavMenu } from "@ui/nav-menu";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@ui/sheet";

export const NavigationSheet = () => {
  return (
    <Sheet>
      <VisuallyHidden>
        <SheetTitle>Navigation Menu</SheetTitle>
      </VisuallyHidden>

      <SheetTrigger asChild>
        <Button size="icon" variant="outline">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="px-6 py-3">
        <Logo />
        <NavMenu className="mt-6 [&>div]:h-full" />
      </SheetContent>
    </Sheet>
  );
};
