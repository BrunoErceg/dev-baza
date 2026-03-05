"use client";
import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { createWebsite } from "@features/websites/actions";
import {
  CATEGORY_MAP,
  COLOR_STYLE_MAP,
  STYLE_MAP,
  TECH_MAP,
} from "@features/websites/constants";
import { WebsiteFormValues, websiteSchema } from "@features/websites/schemas";

import { AlertState } from "@ui/alert-state";
import { FormInput } from "@ui/form-input";
import { FormSelectField } from "@ui/form-select-field";

import { UploadImageButton } from "./upload-image-button";

interface AddWebsiteFormProps {
  onLoadingChange: (loading: boolean) => void;
  onClose: () => void;
}

export function AddWebsiteForm({
  onLoadingChange,
  onClose,
}: AddWebsiteFormProps) {
  const [isPending, startTransition] = useTransition();

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
    startTransition(async () => {
      const { error } = await createWebsite(data);
      if (error) {
        setError("root", {
          type: "server",
          message: error,
        });
      } else {
        onClose();
      }
    });
  }

  return (
    <div className="overflow-y-auto px-4">
      <form
        id="form-add-website"
        className="mt-5 flex flex-col gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        {errors.root && <AlertState title={errors.root.message} />}
        <div className="flex flex-col gap-5 md:grid md:grid-cols-2">
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
            options={Object.keys(CATEGORY_MAP)}
            map={CATEGORY_MAP}
          />
          <FormSelectField
            name="style"
            control={control}
            label="Stil dizajna"
            placeholder="Odaberite stil"
            options={Object.keys(STYLE_MAP)}
            map={STYLE_MAP}
          />
          <FormSelectField
            name="technology"
            control={control}
            label="Tehnologija"
            placeholder="Odaberite tehnologiju"
            options={Object.keys(TECH_MAP)}
            map={TECH_MAP}
          />
          <FormSelectField
            name="colorStyle"
            control={control}
            label="Stil boja"
            placeholder="Odaberite stil boja"
            options={Object.keys(COLOR_STYLE_MAP)}
            map={COLOR_STYLE_MAP}
          />
          <div className="col-span-2 flex flex-col">
            <UploadImageButton
              imageUrl={imageUrl}
              setValue={setValue}
              errors={errors}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
