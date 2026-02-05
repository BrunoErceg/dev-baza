"use client";
import { Category, Style } from "@prisma/client";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useSearchParams, useRouter } from "next/navigation";
export function WebsiteFilterBar() {
  const categories = Object.values(Category);
  const styles = Object.values(Style);
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [selectedStyle, setSelectedStyle] = useState<string | undefined>();
  const [filterCount, setFilterCount] = useState(0);
  const [resetKey, setResetKey] = useState(0);
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  console.log(categoryParam);
  useEffect(() => {
    setFilterCount((selectedCategory ? 1 : 0) + (selectedStyle ? 1 : 0));
  }, [selectedCategory, selectedStyle]);

  const handleReset = () => {
    router.push("?");
    setSelectedCategory(undefined);
    setSelectedStyle(undefined);
    setResetKey((prev) => prev + 1);
  };

  const handleFilterChange = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="bg-gray-200/80 rounded-md mt-3 p-3 w-full flex justify-between">
      <div key={resetKey} className="flex gap-3">
        <Select
          value={selectedCategory}
          onValueChange={(value) => {
            setSelectedCategory(value);
            handleFilterChange("category", value);
          }}
        >
          <SelectTrigger className="w-full bg-white cursor-pointer font-semibold p-5 max-w-48">
            <SelectValue placeholder="Kategorija" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectGroup>
              <SelectLabel>Kategorija</SelectLabel>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          value={selectedStyle}
          onValueChange={(value) => {
            (setSelectedStyle(value), handleFilterChange("style", value));
          }}
        >
          <SelectTrigger className="w-full bg-white cursor-pointer font-semibold p-5 max-w-48">
            <SelectValue placeholder="Stil" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectGroup>
              <SelectLabel>Stil</SelectLabel>
              {styles.map((style) => (
                <SelectItem key={style} value={style}>
                  {style}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex gap-5">
        <Button className="p-5" onClick={handleReset}>
          Poništi filtre: {filterCount}
        </Button>
      </div>
    </div>
  );
}
