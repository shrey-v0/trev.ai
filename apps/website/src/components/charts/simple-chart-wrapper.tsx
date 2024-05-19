"use client";

import { SimpleChart } from "./simple-chart";

interface SimpleChartProps<TData> {
  data: TData[];
  unit?: string;
  category: keyof TData;
}

export const SimpleChartWrapper = <TData,>({
  data,
  unit = "PRs",
  category,
}: SimpleChartProps<TData>) => {
  return (
    <div className="flex items-center gap-2">
      <SimpleChart
        data={data}
        category={category}
        formatter={(val) => `${val} ${unit}`}
      />
    </div>
  );
};

export default SimpleChartWrapper;
