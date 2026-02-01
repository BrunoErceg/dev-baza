"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { UploadButton } from "@/lib/uploadthing";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createWebsite } from "@/actions/create-website";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().trim().min(2, "Naziv mora imati barem 2 znaka.").max(32, "Naziv može imati najviše 32 znaka."),
  url: z.url({ message: "Unesite ispravnu URL adresu." }),
  image: z.string().min(1, "Slika je obavezna."), // Uploadthing vraća URL, min(1) je dovoljno
  author: z.string().trim().min(2, "Ime autora mora imati barem 2 znaka.").max(32, "Ime autora je predugačko."),
  type: z.enum(["PORTFOLIO", "WORK"]),
});

export type WebsiteValues = z.infer<typeof formSchema>;

export function AddWebsiteForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      url: "",
      author: "",
      type: "WORK",
      image: "",
    },
  });
  const imageUrl = form.watch("image");

  async function onSubmit(data: z.infer<typeof formSchema>) {
    alert("working");
    const result = await createWebsite(data);
    if (result.success) {
      toast.success(result.success);
      router.refresh();
    }
    if (result.error) toast.error(result.error);
  }

  return (
    <form
      id="form-add-website"
      className="flex flex-col gap-10"
      onSubmit={form.handleSubmit(onSubmit, (errors) => console.log("Validation Errors:", errors))}
    >
      <div className="flex gap-10">
        <div className="w-1/2">
          <Field className="w-full flex flex-col h-full">
            {imageUrl ? (
              <div className="relative flex flex-col grow">
                <Image src={imageUrl} alt="Preview" width={600} height={480} className="rounded-md object-cover w-full grow" />
                <Button type="button" variant="destructive" onClick={() => form.setValue("image", "")} className="absolute top-2 right-2">
                  Izbriši
                </Button>
              </div>
            ) : (
              <>
                <UploadButton
                  endpoint="imageUploader"
                  appearance={{
                    button: "bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded", // Stil samog gumba
                    container: "border-2 grow  bg-gray-50 rounded-lg border-dashed border-gray-200 p-4", // Stil vanjskog kontejnera
                    allowedContent: "text-xs text-gray-400 uppercase", // Tekst ispod gumba (npr. "Image (4MB)")
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
                  onUploadError={(error) => alert(error.message)}
                />
                {form.formState.errors.image && <p className="text-red-500 text-sm">{form.formState.errors.image.message}</p>}
              </>
            )}
          </Field>
        </div>
        <div className="w-1/2 flex flex-col gap-7">
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="website-name">Naziv web stranice</FieldLabel>
                  <Input
                    {...field}
                    id="website-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Unesite naziv web stranice"
                    autoComplete="off"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
          <FieldGroup>
            <Controller
              name="author"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="website-author">Autor</FieldLabel>
                  <Input
                    {...field}
                    id="website-author"
                    aria-invalid={fieldState.invalid}
                    placeholder="Unesite ime autora"
                    autoComplete="off"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
          <Controller
            name="type"
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel>Vrsta</FieldLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="WORK">Rad</SelectItem>
                    <SelectItem value="PORTFOLIO">Portfolio</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            )}
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Spremanje..." : "Spremi web stranicu"}
        </Button>
      </div>
    </form>
  );
}
