import { forwardRef } from "react";

import { Field, FieldError, FieldLabel } from "@ui/field";
import { Input } from "@ui/input";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function FormInput({
  label,
  error,
  id,
  placeholder,
  ...props
}: FormInputProps) {
  return (
    <Field className="text-left">
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
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
