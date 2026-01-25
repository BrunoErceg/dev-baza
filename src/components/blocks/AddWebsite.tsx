"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { updateUsername } from "@/actions/update-user";
import { useSession } from "next-auth/react";
import { UploadButton, UploadDropzone } from "@/lib/uploadthing";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters.").max(32, "Name must be at most 32 characters."),
  url: z.string().min(2, "Name must be at least 2 characters.").max(32, "Name must be at most 32 characters."),
  image: z.string().min(2, "Name must be at least 2 characters."),
  type: z.enum(["PORTFOLIO", "WORK"]),
});

export function AddWebsite() {
  const { data: session, update } = useSession();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      url: "",
      image: "",
      type: undefined,
    },
  });
  const imageUrl = form.watch("image");

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const name = data.name;
    /* const result = await createWebsite(name);
    if (result.success) update({ name: data.name });
    if (result.error) alert(result.error); */
  }

  return (
    <>
      <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-demo-title">Website Name</FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-demo-title"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter website name"
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
                <FieldLabel htmlFor="form-rhf-demo-title">URL</FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-demo-title"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter new url"
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
              <FieldLabel>Type</FieldLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="WORK">Work</SelectItem>
                  <SelectItem value="PORTFOLIO">Portfolio</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          )}
        />

        <Field>
          <FieldLabel>Website Screenshot</FieldLabel>
          {imageUrl ? (
            <div className="relative h-100 w-100">
              <img src={imageUrl} alt="Preview" className="rounded-md object-cover h-full w-full" />
              <Button type="button" variant="destructive" onClick={() => form.setValue("image", "")} className="absolute top-2 right-2">
                X
              </Button>
            </div>
          ) : (
            <UploadDropzone
              endpoint="imageUploader"
              className="w-50 h-50"
              onClientUploadComplete={(res) => {
                form.setValue("image", res[0].ufsUrl); // Spremi URL u formu
                console.log("Files: ", res);
              }}
              onUploadError={(error) => alert(error.message)}
            />
          )}
          {form.formState.errors.image && <p className="text-red-500 text-sm">{form.formState.errors.image.message}</p>}
        </Field>
        <Field orientation="horizontal">
          <Button type="submit" form="form-rhf-demo">
            Save
          </Button>
        </Field>
      </form>
    </>
  );
}
