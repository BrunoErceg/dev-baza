"use client";
import { BiImageAlt } from "react-icons/bi";
import { TbImageInPicture } from "react-icons/tb";

import { useWebsites } from "@features/websites/websites-context";

import { cn } from "@/lib/utils";

export function GridToggle({ className }: { className?: string }) {
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
    <div className={cn("flex justify-end gap-2", className)}>
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
