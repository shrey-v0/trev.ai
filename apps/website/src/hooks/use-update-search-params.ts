import { useCallback } from "react";
import { useSearchParams } from "next/navigation";

const useUpdateSearchParams = () => {
  const searchParams = useSearchParams();
  const update = useCallback(
    (params: Record<string, boolean | string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString());

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      }

      return newSearchParams.toString();
    },
    [searchParams],
  );

  return update;
};

export default useUpdateSearchParams;
