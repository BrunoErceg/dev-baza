"use client";
import { useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { UploadButton } from "@/lib/uploadthing";
import { Category, Style } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

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
import { createWebsite } from "@/actions/create-website";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Naziv mora imati barem 2 znaka.")
    .max(32, "Naziv može imati najviše 32 znaka."),
  url: z.url({ message: "Unesite ispravnu URL adresu." }),
  image: z.string().min(1, "Slika je obavezna."),
  category: z.enum(Object.values(Category)),
  style: z.enum(Object.values(Style)),
});
export type WebsiteValues = z.infer<typeof formSchema>;

export function AddWebsiteForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      url: "",
      category: "OSTALO",
      style: "OSTALO",
      image: "",
    },
  });
  const imageUrl = form.watch("image");

  async function onSubmit(data: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const result = await createWebsite(data);
      if (result.success) {
        toast.success(result.success);
        router.refresh();
      } else if (result.error) {
        toast.error(result.error);
      }
    });
  }

  return (
    <form
      id="form-add-website"
      className="flex flex-col gap-5"
      onSubmit={form.handleSubmit(onSubmit, (errors) =>
        console.log("Validation Errors:", errors),
      )}
    >
      <div className="flex flex-col gap-5">
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
        <Field className="w-full">
          {imageUrl ? (
            <AspectRatio ratio={8 / 6} className="relative bg-muted group ">
              <Image
                src={imageUrl}
                alt="Preview"
                width={800}
                height={600}
                className="rounded-md h-full object-cover"
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
                    "border-2 bg-gray-50 rounded-lg border-dashed border-gray-200 p-4",
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
                <p className="text-red-500 text-sm">
                  {form.formState.errors.image.message}
                </p>
              )}
            </>
          )}
        </Field>
      </div>
      <div className="flex justify-end">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Spremanje..." : "Spremi web-stranicu"}
        </Button>
      </div>
    </form>
  );
}
