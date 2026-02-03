"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { UploadButton } from "@/lib/uploadthing";
import { createWebsite } from "@/actions/create-website";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Avatar, AvatarImage } from "../ui/avatar";
import { updateAvatar } from "@/actions/update-avatar";

const formSchema = z.object({
  image: z.string().min(1, "Slika je obavezna."),
});

export function AvatarForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: "",
    },
  });
  const imageUrl = form.watch("image");

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const result = await updateAvatar(data.image);
    if (result.success) {
      toast.success(result.success);
      router.refresh();
    }
    if (result.error) toast.error(result.error);
  }

  return (
    <form
      id="form-change-avatar"
      className="flex flex-col gap-5"
      onSubmit={form.handleSubmit(onSubmit, (errors) => console.log("Validation Errors:", errors))}
    >
      <div className="flex flex-col gap-5">
        <Field className="w-full flex flex-col h-full">
          {imageUrl ? (
            <div className="relative flex justify-center">
              <Avatar className="w-50 h-50">
                <AvatarImage src={imageUrl} />
              </Avatar>
              <Button type="button" variant="destructive" onClick={() => form.setValue("image", "")} className="absolute top-2 right-2">
                Izbriši
              </Button>
            </div>
          ) : (
            <>
              <UploadButton
                endpoint="imageUploader"
                appearance={{
                  button: "bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
                  container: "border-2 grow bg-gray-50 rounded-lg border-dashed border-gray-200 p-4",
                  allowedContent: "text-xs text-gray-400 uppercase",
                }}
                onClientUploadComplete={(res) => {
                  form.setValue("image", res[0].ufsUrl);
                }}
                content={{
                  allowedContent: (
                    <div className="flex flex-col items-center">
                      <h2>Nova Slika Profila</h2>
                      <span>Slike do 4MB.</span>
                      <span>Aspect ratio 1:1</span>
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
      <div className="flex justify-end">
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Spremanje..." : "Spremi sliku profila"}
        </Button>
      </div>
    </form>
  );
}
