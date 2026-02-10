import Image from "next/image";

import { cn } from "@/lib/utils";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";

export function HighlightedWebsite({ className }: { className?: string }) {
  return (
    <div className={cn(className)}>
      <AspectRatio ratio={8 / 6} className="relative">
        <Badge className="absolute top-4 right-4">
          🏆 WEB STRANICA MJESECA
        </Badge>
        <Image
          src="https://cdn.dribbble.com/userupload/15829361/file/original-8e34f4403e0901445b613da656e72b64.png?resize=1024x768&vertical=center"
          alt="Preview"
          width={200}
          height={200}
          priority
          className="w-full rounded-sm"
        />
      </AspectRatio>
    </div>
  );
}
