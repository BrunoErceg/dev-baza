"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { OrderByOption } from "@/types/websites";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function WebsiteSortSelect() {
  const ORDER_BY_OPTIONS: OrderByOption[] = ["Datum", "Lajkovi", "Pregledi"];
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("orderBy");
  const [orderBy, setOrderBy] = useState(categoryParam || ORDER_BY_OPTIONS[0]);

  const changeOrderBy = (value: string) => {
    setOrderBy(value);
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("orderBy", value);
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div>
      <Select value={orderBy} onValueChange={changeOrderBy}>
        <SelectTrigger className="w-45 cursor-pointer">
          <SelectValue placeholder="Poredaj po" />
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
