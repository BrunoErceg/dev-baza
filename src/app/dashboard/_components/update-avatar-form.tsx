"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { UploadButton } from "@/lib/uploadthing";
import { updateAvatar } from "@/actions/user-actions";
import { IoCameraOutline } from "react-icons/io5";
import { FiUpload } from "react-icons/fi";

import { Field } from "@components/ui/field";
import { Avatar, AvatarImage } from "@components/ui/avatar";
import { AvatarFormValues, avatarSchema } from "@/lib/schemas";
import { cn } from "@/lib/utils";

export function UpdateAvatarForm({ userImage }: { userImage: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isUploading, setIsUploading] = useState(false);
  const form = useForm<AvatarFormValues>({
    resolver: zodResolver(avatarSchema),
    defaultValues: {
      image: "",
    },
  });

  async function onSubmit(data: AvatarFormValues) {
    startTransition(async () => {
      const result = await updateAvatar({ image: data.image });
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
      id="form-change-avatar"
      className="flex flex-col gap-5"
      onSubmit={form.handleSubmit(onSubmit, (errors) =>
        console.log("Validation Errors:", errors),
      )}
    >
      <div className="flex flex-col gap-5">
        <Field className="w-full flex flex-col h-full">
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
                  <div className="w-25 h-25 cursor-pointer relative group">
                    <div
                      className={cn(
                        "absolute inset-0 rounded-full z-20 flex items-center justify-center duration-200 bg-black/40 h-25 w-25 opacity-0 group-hover:opacity-100",
                        (isUploading || isPending) && "opacity-100",
                      )}
                    >
                      {isUploading || isPending ? (
                        <FiUpload size={35} className="animate-pulse" />
                      ) : (
                        <IoCameraOutline size={35} />
                      )}
                    </div>
                    <Avatar className="w-25 h-25 cursor-pointer">
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
              <p className="text-red-500 text-sm">
                {form.formState.errors.image.message}
              </p>
            )}
          </>
        </Field>
      </div>
    </form>
  );
}
