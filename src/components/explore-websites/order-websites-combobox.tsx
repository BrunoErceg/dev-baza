"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useEffect, useState } from "react";

export function OrderWebsitesCombobox() {
  const ORDER_BY = ["Datum", "Lajkovi", "Pregledi"] as const;
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("orderBy");
  const [orderBy, setOrderBy] = useState(categoryParam || ORDER_BY[0]);

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
            {ORDER_BY.map((orderBy) => (
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
