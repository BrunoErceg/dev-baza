import { GridToggle } from "./grid-toggle";
import { WebsiteFilter } from "./website-filter";
import { WebsiteSortSelect } from "./websites-sort-select";

export function WebsiteNavigation() {
  return (
    <div className="flex w-full items-center justify-between gap-5 py-5">
      <WebsiteSortSelect />
      <WebsiteFilter />
      <GridToggle />
    </div>
  );
}
