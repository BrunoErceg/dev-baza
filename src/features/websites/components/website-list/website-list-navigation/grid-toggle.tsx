"use client";
import { BiImageAlt } from "react-icons/bi";
import { TbImageInPicture } from "react-icons/tb";

import { useWebsites } from "@features/websites/websites-context";

import { cn } from "@/lib/utils";

export function GridToggle() {
  const { gridConfig, updateGrid } = useWebsites();

  const configs = [
    {
      id: "small",
      Icon: TbImageInPicture,
    },
    {
      id: "big",
      Icon: BiImageAlt,
    },
  ] as const;

  return (
    <div className="flex gap-2">
      {configs.map(({ id, Icon }) => (
        <Icon
          key={id}
          className={cn(
            "size-6 cursor-pointer rounded-sm p-0.5",
            gridConfig === id && "bg-gray-200",
          )}
          onClick={() => updateGrid(id)}
        />
      ))}
    </div>
  );
}
