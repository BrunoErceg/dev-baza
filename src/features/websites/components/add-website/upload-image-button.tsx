import Image from "next/image";
import { FieldErrors, UseFormSetValue } from "react-hook-form";

import { UploadButton } from "@lib/uploadthing";
import { toast } from "sonner";

import { WebsiteFormValues } from "@features/websites/schemas";

import { utDeleteFileAction } from "@actions/uploadthing";

import { AspectRatio } from "@ui/aspect-ratio";
import { Button } from "@ui/button";
import { Field } from "@ui/field";

interface UploadImageButtonProps {
  imageUrl: string;
  setValue: UseFormSetValue<WebsiteFormValues>;
  errors: FieldErrors<WebsiteFormValues>;
}

export function UploadImageButton({
  imageUrl,
  setValue,
  errors,
}: UploadImageButtonProps) {
  const handelDelete = async () => {
    setValue("image", "");
    await utDeleteFileAction(imageUrl);
  };

  console.log("errors", errors);

  return (
    <Field className="mx-auto">
      <AspectRatio ratio={8 / 6}>
        {imageUrl ? (
          <>
            <div className="relative h-full w-full rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4">
              <Button
                type="button"
                variant="destructive"
                onClick={() => handelDelete()}
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
              <p className="text-sm text-red-500">{errors.image.message}</p>
            )}
          </>
        )}
      </AspectRatio>
    </Field>
  );
}
