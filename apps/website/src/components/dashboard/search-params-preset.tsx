"use client";

import type { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@trev/ui";

import useUpdateSearchParams from "@/hooks/use-update-search-params";

export const SearchParamsPreset = <T extends string>({
  disabled,
  defaultValue,
  values,
  searchParam,
  icon,
  placeholder,
  formatter,
}: {
  disabled?: boolean;
  defaultValue?: T;
  values: readonly T[];
  searchParam: string;
  icon?: ReactNode;
  placeholder?: string;
  formatter?(value: T): ReactNode;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const updateSearchParams = useUpdateSearchParams();

  const onSelect = (value: T) => {
    const searchParams = updateSearchParams({ [searchParam]: value });
    router.replace(`${pathname}?${searchParams}`, { scroll: false });
  };
  return (
    <Select
      defaultValue={defaultValue}
      onValueChange={onSelect}
      disabled={disabled}
    >
      <SelectTrigger className="bg-background w-[200px] text-left">
        <div className="flex w-full flex-row items-center gap-2">
          {icon}
          <SelectValue placeholder={placeholder} />
        </div>
      </SelectTrigger>
      <SelectContent>
        {values.map((value) => (
          <SelectItem key={value} value={value}>
            {formatter?.(value) || value}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
