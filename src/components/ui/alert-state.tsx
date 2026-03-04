import { AlertCircleIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "./alert";

interface AlertStateProps {
  title?: string;
  description?: string;
}

export function AlertState({ title, description }: AlertStateProps) {
  return (
    <Alert variant="destructive" className="border-destructive">
      <AlertCircleIcon />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
