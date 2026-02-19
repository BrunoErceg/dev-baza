import { Controller } from "react-hook-form";

import { WebsiteFormValues } from "@features/websites/schemas";

import { Field, FieldError, FieldGroup, FieldLabel } from "./field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

interface FormSelectFieldProps {
  name: keyof WebsiteFormValues;
  control: any;
  label: string;
  placeholder: string;
  options: any; // Enum objekt (npr. Category)
  map: Record<string, { label: string }>;
}

export function FormSelectField({
  name,
  control,
  label,
  placeholder,
  options,
  map,
}: FormSelectFieldProps) {
  return (
    <FieldGroup>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>{label}</FieldLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent position="popper">
                {Object.values(options).map((opt: any) => (
                  <SelectItem key={opt} value={opt}>
                    {map[opt]?.label || opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
}
