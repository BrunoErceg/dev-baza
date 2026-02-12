import { ActionError } from "@/lib/auth-utils";

export type ActionResponse<T> = {
  data: T | null;
  success: string | null;
  error: string | null;
};
