import { LucideIcon, PackageOpen } from "lucide-react";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./empty";

interface EmptyStateProps {
  Icon?: LucideIcon;
  title: string;
  description: string;
  cta?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  Icon = PackageOpen,
  title,
  description,
  cta,
  className,
}: EmptyStateProps) {
  return (
    <Empty className={className}>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Icon />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
        {cta && <EmptyContent>{cta}</EmptyContent>}
      </EmptyHeader>
    </Empty>
  );
}
