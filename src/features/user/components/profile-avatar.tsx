import { cn } from "@lib/utils";

import { Avatar, AvatarImage } from "@ui/avatar";

interface ProfileAvatarProps {
  image: string;
  className?: string;
}

export function ProfileAvatar({ image, className }: ProfileAvatarProps) {
  return (
    <Avatar className={cn("cursor-pointer", className)}>
      <AvatarImage src={image} />
    </Avatar>
  );
}
