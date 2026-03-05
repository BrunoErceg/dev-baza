"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { FiUpload } from "react-icons/fi";
import { IoCameraOutline } from "react-icons/io5";

import { zodResolver } from "@hookform/resolvers/zod";
import { DEFAULT_PROFILE_IMG } from "@lib/constants";
import { toast } from "sonner";

import { updateAvatar } from "@features/users/actions";
import { AvatarFormValues, avatarSchema } from "@features/users/schema";

import { utDeleteFileAction } from "@actions/uploadthing";

import { UploadButton } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";

import { Large, Muted } from "@ui/typography";

import { Field } from "@components/ui/field";

import { ProfileAvatar } from "../profile-avatar";

export function UpdateAvatarForm({ userImage }: { userImage: string }) {
  const [isPending, startTransition] = useTransition();
  const [isUploading, setIsUploading] = useState(false);
  const { update } = useSession();
  const router = useRouter();

  const form = useForm<AvatarFormValues>({
    resolver: zodResolver(avatarSchema),
    defaultValues: {
      image: "",
    },
  });

  async function onSubmit(data: AvatarFormValues) {
    startTransition(async () => {
      const { error } = await updateAvatar(data);
      if (error) {
        toast.error(error);
      } else {
        await update({ image: data.image });
        toast.success("Uspješno ste ažurirali avatar!");
        if (userImage !== DEFAULT_PROFILE_IMG) {
          await utDeleteFileAction(userImage);
        }
        router.refresh();
      }
    });
  }

  return (
    <div className="flex items-center gap-7">
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
                      <ProfileAvatar image={userImage} className="h-25 w-25" />
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

      <div>
        <Large>Profilna Slika</Large>
        <Muted>
          Kliknite na avatar za prijenos nove fotografije.
          <br className="hidden md:block" /> JPG ili PNG. Maksimalno 4 MB.
        </Muted>
      </div>
    </div>
  );
}
