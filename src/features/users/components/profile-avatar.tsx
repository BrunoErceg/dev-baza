import Image from "next/image";

import { cn } from "@lib/utils";
import { AvatarFallback } from "@radix-ui/react-avatar";

import { Avatar } from "@ui/avatar";

interface ProfileAvatarProps {
  image: string;
  className?: string;
}

export function ProfileAvatar({ image, className }: ProfileAvatarProps) {
  return (
    <Avatar className={cn("cursor-pointer", className)}>
      <Image src={image} alt="Avatar" fill priority className="object-cover" />
      <AvatarFallback className="bg-muted"></AvatarFallback>
    </Avatar>
  );
}
