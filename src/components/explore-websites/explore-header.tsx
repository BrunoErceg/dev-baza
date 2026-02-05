import { Muted } from "../ui/typography";
import { TbImageInPicture } from "react-icons/tb";
import { BiImageAlt } from "react-icons/bi";
import { cn } from "@/lib/utils";
export function ExploreHeader({
  websitesNumber,
  setGridConfig,
  gridConfig,
}: {
  websitesNumber: number;
  gridConfig: "big" | "small";
  setGridConfig: (config: "big" | "small") => void;
}) {
  return (
    <div className={"flex w-full my-10 items-center justify-between"}>
      <Muted>
        Web-stranice <span className="text-gray-900 border font-semibold px-1.5 py-0 border-gray-900">{websitesNumber}</span>
      </Muted>
      <div className="flex gap-5 items-center">
        <Muted>Izgradi svoj profil, objavi radove i poveži se s vodećim dizajnerima u hrvatskoj.</Muted>
        <div className="flex gap-2">
          <TbImageInPicture
            className={cn("size-6 rounded-sm p-0.5 cursor-pointer", gridConfig === "small" && "bg-gray-300")}
            onClick={() => setGridConfig("small")}
          />
          <BiImageAlt
            className={cn("size-6 rounded-sm p-0.5 cursor-pointer", gridConfig === "big" && "bg-gray-300")}
            onClick={() => setGridConfig("big")}
          />
        </div>
      </div>
    </div>
  );
}
