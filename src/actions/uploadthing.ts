"use server";
import { utapi } from "@/lib/uploadthing-server";

export async function utDeleteFileAction(imageUrl: string) {
  const key = imageUrl.split("/").pop();
  if (key) await utapi.deleteFiles(key);
}
