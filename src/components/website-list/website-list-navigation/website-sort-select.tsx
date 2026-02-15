"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { useUpdateQuery } from "@/hooks/use-update-query";
import { OrderByOption } from "@/types/websites";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function WebsiteSortSelect() {
  const ORDER_BY_OPTIONS: OrderByOption[] = ["Datum", "Lajkovi", "Pregledi"];
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("orderBy");
  const [orderBy, setOrderBy] = useState(categoryParam || ORDER_BY_OPTIONS[0]);
  const { updateQuery } = useUpdateQuery();
  const changeOrderBy = (value: string) => {
    setOrderBy(value);
    updateQuery("orderBy", value);
  };

  return (
    <div>
      <Select value={orderBy} onValueChange={changeOrderBy}>
        <SelectTrigger className="w-35 cursor-pointer rounded-full bg-white">
          <SelectValue className="" placeholder="Poredaj po" />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectGroup>
            {ORDER_BY_OPTIONS.map((orderBy) => (
              <SelectItem
                key={orderBy}
                value={orderBy}
                className="cursor-pointer"
              >
                {orderBy}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
