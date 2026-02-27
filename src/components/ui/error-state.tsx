import { CloudAlert, LucideIcon, PackageOpen } from "lucide-react";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./empty";

interface EmptyStateProps {
  Icon?: LucideIcon;
  title?: string;
  description: string;
  className?: string;
}

export function ErrorState({
  Icon = CloudAlert,
  title = "Greška",
  description,
  className,
}: EmptyStateProps) {
  return (
    <Empty className={className}>
      <EmptyHeader>
        <EmptyMedia className="bg-destructive/10" variant="icon">
          <Icon className="text-destructive" />
        </EmptyMedia>
        <EmptyTitle className="text-destructive">{title}</EmptyTitle>
        <EmptyDescription className="text-destructive/60">
          {description}
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
