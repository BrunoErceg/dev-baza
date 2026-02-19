"use client";
import Image from "next/image";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Category,
  ColorStyle,
  PrimaryColor,
  Style,
  Technology,
} from "@prisma/client";
import { toast } from "sonner";

import { createWebsite } from "@features/websites/actions";
import {
  CATEGORY_MAP,
  COLOR_STYLE_MAP,
  PRIMARY_COLOR_MAP,
  STYLE_MAP,
  TECH_MAP,
} from "@features/websites/constants";
import { WebsiteFormValues, websiteSchema } from "@features/websites/schemas";

import { useServerAction } from "@/hooks/use-server-action";
import { UploadButton } from "@/lib/uploadthing";

import { AspectRatio } from "@ui/aspect-ratio";
import { Button } from "@ui/button";
import { Field } from "@ui/field";
import { FormInput } from "@ui/form-input";
import { FormSelectField } from "@ui/form-select-field";
import { Spinner } from "@ui/spinner";

export function AddWebsiteForm({
  onLoadingChange,
}: {
  onLoadingChange: (loading: boolean) => void;
}) {
  const { isPending, action } = useServerAction(createWebsite);
  useEffect(() => {
    onLoadingChange(isPending);
  }, [isPending]);
  const {
    register,
    handleSubmit,
    setError,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<WebsiteFormValues>({
    resolver: zodResolver(websiteSchema),
    defaultValues: {
      name: "",
      url: "",
      category: "OTHER",
      style: "OTHER",
      technology: "OTHER",
      colorStyle: "LIGHT",
      image: "",
    },
  });
  const imageUrl = watch("image");
  async function onSubmit(data: WebsiteFormValues) {
    action(data);
  }

  return (
    <form
      id="form-add-website"
      className="mt-5 flex flex-col gap-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid grid-cols-2 gap-5">
        <FormInput
          label="Naziv"
          {...register("name")}
          placeholder="primjer.com"
          error={errors.name?.message}
        />
        <FormInput
          label="URL adresa"
          {...register("url")}
          placeholder="https://www.primjer.hr"
          error={errors.url?.message}
        />

        <FormSelectField
          name="category"
          control={control}
          label="Kategorija"
          placeholder="Odaberite kategoriju"
          options={Category}
          map={CATEGORY_MAP}
        />
        <FormSelectField
          name="style"
          control={control}
          label="Stil dizajna"
          placeholder="Odaberite stil"
          options={Style}
          map={STYLE_MAP}
        />
        <FormSelectField
          name="technology"
          control={control}
          label="Tehnologija"
          placeholder="Odaberite tehnologiju"
          options={Technology}
          map={TECH_MAP}
        />
        <FormSelectField
          name="colorStyle"
          control={control}
          label="Stil boja"
          placeholder="Odaberite stil boja"
          options={ColorStyle}
          map={COLOR_STYLE_MAP}
        />
        <div className="col-span-2 flex flex-col">
          <Field className="mx-auto">
            <AspectRatio ratio={8 / 6}>
              {imageUrl ? (
                <>
                  <div className="relative h-full w-full rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4">
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => setValue("image", "")}
                      className="absolute top-2 right-2 z-10"
                    >
                      Izbriši
                    </Button>

                    <AspectRatio ratio={8 / 6}>
                      <Image
                        src={imageUrl}
                        alt="Slika web stranice"
                        fill
                        className="object-cover"
                      />
                    </AspectRatio>
                  </div>
                </>
              ) : (
                <>
                  <UploadButton
                    endpoint="imageUploader"
                    appearance={{
                      button:
                        "bg-blue-600 cursor-pointer rounded-full!  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
                      container:
                        "border-2 bg-gray-50 w-full h-full   rounded-lg border-dashed border-gray-300 p-4",
                      allowedContent: "text-xs text-gray-400 uppercase",
                    }}
                    onClientUploadComplete={(res) => {
                      setValue("image", res[0].ufsUrl);
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
                  {errors.image && (
                    <p className="text-sm text-red-500">
                      {errors.image.message}
                    </p>
                  )}
                </>
              )}
            </AspectRatio>
          </Field>
        </div>
      </div>
    </form>
  );
}
