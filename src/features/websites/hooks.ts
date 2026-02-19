import { useState } from "react";

import { UserWebsitesTableData } from "./types";

type Order = "asc" | "desc";
type SortBy = "likes" | "views" | "name";

export function useOderWebsiteTable(websites: UserWebsitesTableData[]) {
  const [sortBy, setSortBy] = useState<SortBy>("name");
  const [order, setOrder] = useState<Order>("asc");

  const sortedWebsites = [...websites].sort((a, b) => {
    switch (sortBy) {
      case "likes":
        return order === "asc"
          ? a._count.likedBy - b._count.likedBy
          : b._count.likedBy - a._count.likedBy;
      case "views":
        return order === "asc" ? a.views - b.views : b.views - a.views;
      case "name":
        return order === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
    }
  });
  const handleSort = (key: SortBy) => {
    if (sortBy === key) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setOrder(key === "name" ? "asc" : "desc");
    }
  };

  return { sortedWebsites, handleSort };
}
