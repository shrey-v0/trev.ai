import { Separator } from "@trev/ui";

import { MetricsCard } from "@/components/dashboard/kpi-card";

const Loading = () => (
  <div className="grid gap-4">
    <div className="grid w-full grid-cols-2 gap-3">
      {new Array(4).fill(0).map((_, i) => (
        <MetricsCard.Skeleton withChildren key={i} />
      ))}
    </div>
    <h2 className="text-2xl font-semibold">Cycle Time Breakdown</h2>
    <Separator />
    <div className="grid grid-cols-3 gap-3">
      {new Array(3).fill(0).map((_, i) => (
        <MetricsCard.Skeleton withChildren key={i} />
      ))}
    </div>
    <MetricsCard.Skeleton withChildren />
  </div>
);

export default Loading;
``;
