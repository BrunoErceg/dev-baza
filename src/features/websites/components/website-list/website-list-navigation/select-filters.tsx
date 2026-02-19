"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { cn } from "@lib/utils";
import { Delete, LucideIcon } from "lucide-react";

import {
  CATEGORY_MAP,
  COLOR_STYLE_MAP,
  ORDER_BY_MAP,
  STYLE_MAP,
  TECH_MAP,
} from "@features/websites/constants";

import { useUpdateQuery } from "@/hooks/use-update-query";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui/select";

interface QuerySelectProps {
  map: Record<
    string,
    { label: string; slug: string; twClass?: string; icon?: LucideIcon }
  >;
  paramName: string;
  placeholder: string;
  deleteItem?: boolean;
  className?: string;
}

const QuerySelect = ({
  map,
  paramName,
  placeholder,
  deleteItem = true,
  className,
}: QuerySelectProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { updateQuery } = useUpdateQuery();

  const currentValue = searchParams.get(paramName) || "";

  const handleChange = (value: string) => {
    value === "obriši" ? updateQuery(paramName) : updateQuery(paramName, value);
    router.refresh();
  };

  return (
    <div className={cn(className)}>
      <Select value={currentValue} onValueChange={handleChange}>
        <SelectTrigger className="w-40 rounded-full bg-white">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectGroup>
            {Object.values(map).map((item) => (
              <SelectItem key={item.slug} value={item.slug}>
                <div className="flex items-center gap-2">
                  {item.icon && <item.icon size={14} />}
                  {item.twClass && (
                    <div className={`h-3 w-3 rounded-full ${item.twClass}`} />
                  )}
                  {item.label}
                </div>
              </SelectItem>
            ))}

            {deleteItem && (
              <SelectItem value="obriši">
                <Delete />
                Obriši
              </SelectItem>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

// Korištenje:

const StyleSelect = ({ className }: { className?: string }) => (
  <QuerySelect
    className={className}
    map={STYLE_MAP}
    paramName="stil"
    placeholder="Stil"
  />
);

const ColorStyleSelect = ({ className }: { className?: string }) => (
  <QuerySelect
    className={className}
    map={COLOR_STYLE_MAP}
    paramName="stil-dizajna"
    placeholder="Stil Dizajna"
  />
);

const TechnologySelect = ({ className }: { className?: string }) => (
  <QuerySelect
    className={className}
    map={TECH_MAP}
    paramName="tehnologija"
    placeholder="Tehnologija"
  />
);

const CategorySelect = ({ className }: { className?: string }) => (
  <QuerySelect
    className={className}
    map={CATEGORY_MAP}
    paramName="kategorija"
    placeholder="Kategorija"
  />
);

const OrderBySelect = ({ className }: { className?: string }) => (
  <QuerySelect
    className={className}
    map={ORDER_BY_MAP}
    paramName="poredaj-po"
    placeholder="Poredaj po"
    deleteItem={false}
  />
);

export {
  StyleSelect,
  ColorStyleSelect,
  TechnologySelect,
  CategorySelect,
  OrderBySelect,
};
