import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatRelativeDate = (dateParam: Date) => {
  const date = typeof dateParam === "string" ? new Date(dateParam) : dateParam;
  const ageInMin = Math.floor(
    (new Date().getTime() - date.getTime()) / (1000 * 60),
  );
  if (ageInMin === 0) return "Upravo";
  if (ageInMin < 60) return `${ageInMin}m`;

  const ageInHours = Math.floor(ageInMin / 60);
  if (ageInHours < 24) return `${ageInHours}h`;

  const ageInDays = Math.floor(ageInHours / 24);

  if (ageInDays < 7) return `${ageInDays}d`;

  return `${Math.floor(ageInDays / 7)} tj.`;
};
