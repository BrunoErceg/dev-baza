import { GridToggle } from "./grid-toggle";
import { SortWebsitesSelect } from "./sort-websites-select";
import { WebsiteFilter } from "./website-filter";

export function WebsiteNavigation() {
  return (
    <div className="flex w-full items-center justify-between gap-5 py-5">
      <SortWebsitesSelect />
      <WebsiteFilter />
      <GridToggle />
    </div>
  );
}
