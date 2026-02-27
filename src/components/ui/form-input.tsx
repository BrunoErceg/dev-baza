import { InputHTMLAttributes, forwardRef } from "react";

import { cn } from "@lib/utils";

import { Field, FieldError, FieldLabel } from "@ui/field";
import { Input } from "@ui/input";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function FormInput({
  label,
  error,
  id,
  placeholder,
  className,
  ...props
}: FormInputProps) {
  return (
    <Field className={cn("text-left", className)}>
      {label && <FieldLabel htmlFor={id}>{label}</FieldLabel>}
      <Input
        id={id}
        aria-invalid={!!error}
        placeholder={placeholder}
        {...props}
      />
      {error && <FieldError>{error}</FieldError>}
    </Field>
  );
}
