import { cn } from "@lib/utils";
import { AlertCircleIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@ui/alert";

interface AlertMessageProps {
  description: string;
  className?: string;
}

export function ErrorCard({ description, className }: AlertMessageProps) {
  return (
    <Alert variant="destructive" className={cn("max-w-md", className)}>
      <AlertCircleIcon />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
