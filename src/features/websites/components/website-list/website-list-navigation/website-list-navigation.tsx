import { ReactNode } from "react";

import { FunnelPlus } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@ui/accordion";
import { Muted } from "@ui/typography";

import { GridToggle } from "./grid-toggle";
import { OrderBySelect } from "./select-filters";

export function WebsiteListNavigation({ children }: { children: ReactNode }) {
  return (
    <>
      <Accordion
        className="mb-2 rounded-lg p-2 md:hidden"
        type="single"
        collapsible
        defaultValue="item-1"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <Muted className="flex items-center justify-center gap-2">
              <FunnelPlus size={15} />
              Filteri
            </Muted>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex w-full flex-wrap justify-between gap-3">
              {children} <OrderBySelect className="flex-1" />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="hidden w-full items-center justify-between gap-5 py-5 md:flex">
        <OrderBySelect className="flex-1" />
        <div className="flex flex-1 justify-center gap-4">{children}</div>
        <GridToggle className="flex-1" />
      </div>
    </>
  );
}
