import type { ReactNode } from "react";

import { Skeleton } from "@trev/ui";

import { cn } from "@/lib/utils";
import { DeltaBadge } from "./info-badges";

interface MetricCardProps {
  title: string;
  badge?: ReactNode;
  metric: ReactNode;
  delta?: number;
  suffix: string;
  className?: string;
  children?: ReactNode;
}

const MetricsCard = ({
  title,
  badge,
  metric,
  delta,
  suffix,
  className,
  children,
}: MetricCardProps) => {
  return (
    <div
      className={cn(
        "border-border/80 bg-muted/30 flex flex-col space-y-2 rounded-lg border px-3 py-2",
        className,
      )}
    >
      {badge}
      <p className="text-muted-foreground text-sm font-semibold">{title}</p>
      <div className="flex flex-1 items-center gap-2">
        <p className="flex">
          <code className="mr-1 font-mono text-3xl font-semibold empty:mr-0">
            {metric}
          </code>
          <span className="text-muted-foreground self-center text-xs">
            {suffix}
          </span>
        </p>
      </div>
      {delta || delta === 0 ? <DeltaBadge value={delta} /> : null}
      <div>{children}</div>
    </div>
  );
};

const MetricCardSkeleton = ({
  withChildren = false,
}: {
  withChildren?: boolean;
}) => {
  return (
    <div
      className={cn(
        "border-border/80 bg-muted/30 flex flex-col space-y-2 rounded-lg border px-3 py-2",
      )}
    >
      <Skeleton className="h-6 w-10 rounded-lg" />
      <Skeleton className="h-5 w-40" />
      <div className="flex flex-row items-end gap-1">
        <Skeleton className="h-12 w-10" />
        <Skeleton className="h-6 w-40" />
      </div>
      <Skeleton className="h-6 w-10 rounded-lg" />
      {withChildren && (
        <Skeleton className="mt-3 h-[200px] w-full rounded-lg" />
      )}
    </div>
  );
};

MetricsCard.Skeleton = MetricCardSkeleton;

export { MetricsCard };
