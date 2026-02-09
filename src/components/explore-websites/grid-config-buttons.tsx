"use client";
import { useContext } from "react";
import { TbImageInPicture } from "react-icons/tb";
import { BiImageAlt } from "react-icons/bi";
import { cn } from "@/lib/utils";
import { updateGridConfigCookie } from "@/actions/cookies-action";
import { ExploreContext } from "@/context/explore-context";

export function GridConfigButtons() {
  const { gridConfig, setGridConfig } = useContext(ExploreContext);
  const toggleGridConfig = async (action: "small" | "big") => {
    setGridConfig(action);
    await updateGridConfigCookie(action);
  };
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
            "size-6 rounded-sm p-0.5 cursor-pointer",
            gridConfig === id && "bg-gray-300",
          )}
          onClick={() => toggleGridConfig(id)}
        />
      ))}
    </div>
  );
}
