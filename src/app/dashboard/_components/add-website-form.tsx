"use client";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";

import { createWebsite } from "@/actions/website-actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category, Style } from "@prisma/client";
import { toast } from "sonner";

import { useServerAction } from "@/hooks/use-server-action";
import { WebsiteFormValues, websiteSchema } from "@/lib/schemas";
import { UploadButton } from "@/lib/uploadthing";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function AddWebsiteForm() {
  const { isPending, action } = useServerAction(createWebsite);
  const form = useForm<WebsiteFormValues>({
    resolver: zodResolver(websiteSchema),
    defaultValues: {
      name: "",
      url: "",
      category: "OSTALO",
      style: "OSTALO",
      image: "",
    },
  });
  const imageUrl = form.watch("image");

  async function onSubmit(data: WebsiteFormValues) {
    action(data);
  }

  return (
    <form
      id="form-add-website"
      className="flex flex-col gap-5"
      onSubmit={form.handleSubmit(onSubmit, (errors) =>
        console.log("Validation Errors:", errors),
      )}
    >
      <div className="flex gap-5">
        <div className="flex w-1/2 flex-col justify-between gap-3">
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="website-name">
                    Naziv web stranice
                  </FieldLabel>
                  <Input
                    {...field}
                    id="website-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Unesite naziv web stranice"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <FieldGroup>
            <Controller
              name="url"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="website-url">URL adresa</FieldLabel>
                  <Input
                    {...field}
                    id="website-url"
                    aria-invalid={fieldState.invalid}
                    placeholder="Unesite URL adresu"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <FieldGroup>
            <Controller
              name="category"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="website-category">Kategorija</FieldLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger id="website-category">
                      <SelectValue placeholder="Odaberite kategoriju" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(Category).map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <FieldGroup>
            <Controller
              name="style"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="website-style">Stil dizajna</FieldLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger id="website-style">
                      <SelectValue placeholder="Odaberite stil" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(Style).map((style) => (
                        <SelectItem key={style} value={style}>
                          {style}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </div>
        <div className="flex h-full w-1/2 flex-col">
          <Field className="h-full w-full">
            {imageUrl ? (
              <AspectRatio
                ratio={8 / 6}
                className="bg-muted group relative overflow-hidden"
              >
                <Image
                  src={imageUrl}
                  alt="Preview"
                  fill
                  className="rounded-md object-cover"
                />
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => form.setValue("image", "")}
                  className="absolute top-2 right-2"
                >
                  Izbriši
                </Button>
              </AspectRatio>
            ) : (
              <>
                <UploadButton
                  endpoint="imageUploader"
                  appearance={{
                    button:
                      "bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
                    container:
                      "border-2 bg-gray-50 grow rounded-lg border-dashed border-gray-200 p-4",
                    allowedContent: "text-xs text-gray-400 uppercase",
                  }}
                  onClientUploadComplete={(res) => {
                    form.setValue("image", res[0].ufsUrl);
                    console.log("Files: ", res);
                  }}
                  content={{
                    allowedContent: (
                      <div className="flex flex-col items-center">
                        <h2>Slika Web Stranice</h2>
                        <span>Preporučeno 1200x960 (5:4).</span>
                        <span>Slike do 4MB.</span>
                      </div>
                    ),
                  }}
                  onUploadError={(error) => {
                    toast.error(error.message);
                  }}
                />
                {form.formState.errors.image && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.image.message}
                  </p>
                )}
              </>
            )}
          </Field>
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Spremanje..." : "Spremi web-stranicu"}
        </Button>
      </div>
    </form>
  );
}
