import { useRouter, useSearchParams } from "next/navigation";

export const useUpdateQuery = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateQuery = (key: string, value?: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.push(`?${params.toString()}`, { scroll: false });
    router.refresh();
  };

  return { updateQuery };
};
