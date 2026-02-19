import { InputHTMLAttributes } from "react";

import { cn } from "@lib/utils";

import { Field, FieldError, FieldLabel } from "@ui/field";

import { Textarea } from "./textarea";

interface FormInputProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export function FormTextarea({
  label,
  error,
  id,
  placeholder,
  className,
  ...props
}: FormInputProps) {
  return (
    <Field className={cn("text-left", className)}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Textarea
        id={id}
        aria-invalid={!!error}
        placeholder={placeholder}
        {...props}
      />
      {error && <FieldError>{error}</FieldError>}
    </Field>
  );
}
