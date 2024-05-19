import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export const Shell = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "border-border w-full rounded-lg border px-3 py-4 backdrop-blur-[2px] md:p-6",
        className,
      )}
    >
      {children}
    </div>
  );
};
