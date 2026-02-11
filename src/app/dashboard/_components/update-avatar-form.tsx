"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiUpload } from "react-icons/fi";
import { IoCameraOutline } from "react-icons/io5";

import { updateAvatar } from "@/actions/user-actions";
import { Avatar, AvatarImage } from "@components/ui/avatar";
import { Field } from "@components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { useAction } from "@/hooks/use-action";
import { AvatarFormValues, avatarSchema } from "@/lib/schemas";
import { UploadButton } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";

export function UpdateAvatarForm({ userImage }: { userImage: string }) {
  const router = useRouter();
  const { isPending, action } = useAction(updateAvatar);
  const [isUploading, setIsUploading] = useState(false);
  const form = useForm<AvatarFormValues>({
    resolver: zodResolver(avatarSchema),
    defaultValues: {
      image: "",
    },
  });

  async function onSubmit(data: AvatarFormValues) {
    action({ image: data.image });
  }

  return (
    <form
      id="form-change-avatar"
      className="flex flex-col gap-5"
      onSubmit={form.handleSubmit(onSubmit, (errors) =>
        console.log("Validation Errors:", errors),
      )}
    >
      <div className="flex flex-col gap-5">
        <Field className="flex h-full w-full flex-col">
          <>
            <UploadButton
              endpoint="imageUploader"
              appearance={{
                button: "w-25 h-25 cursor-pointer",
              }}
              onUploadBegin={() => setIsUploading(true)}
              onClientUploadComplete={(res) => {
                form.setValue("image", res[0].ufsUrl);
                form.handleSubmit(() => onSubmit({ image: res[0].ufsUrl }))();
                setIsUploading(false);
              }}
              content={{
                button: (
                  <div className="group relative h-25 w-25 cursor-pointer">
                    <div
                      className={cn(
                        "absolute inset-0 z-20 flex h-25 w-25 items-center justify-center rounded-full bg-black/40 opacity-0 duration-200 group-hover:opacity-100",
                        (isUploading || isPending) && "opacity-100",
                      )}
                    >
                      {isUploading || isPending ? (
                        <FiUpload size={35} className="animate-pulse" />
                      ) : (
                        <IoCameraOutline size={35} />
                      )}
                    </div>
                    <Avatar className="h-25 w-25 cursor-pointer">
                      <AvatarImage src={userImage} />
                    </Avatar>
                  </div>
                ),
                allowedContent: <></>,
              }}
              onUploadError={(error) => {
                setIsUploading(false);
                toast.error(error.message);
              }}
            />
            {form.formState.errors.image && (
              <p className="text-sm text-red-500">
                {form.formState.errors.image.message}
              </p>
            )}
          </>
        </Field>
      </div>
    </form>
  );
}
