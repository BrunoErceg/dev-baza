import { WebsiteFilters } from "./website-filters";
import { GridConfigButtons } from "./grid-config-buttons";
import { OrderWebsitesCombobox } from "./order-websites-combobox";

export function ExploreNavigation() {
  return (
    <div className="flex w-full gap-5 items-center justify-between py-5">
      <OrderWebsitesCombobox />
      <WebsiteFilters />
      <GridConfigButtons />
    </div>
  );
}
