"use client";

import { AreaChart } from "@tremor/react";

interface SimpleChartProps<TData> {
  data: TData[];
  formatter?: (value: number) => string;
  category: keyof TData;
}
export const SimpleChart = <TData,>({
  data,
  formatter,
  category,
}: SimpleChartProps<TData>) => {
  return (
    <AreaChart
      data={data}
      index="timestamp"
      categories={[category.toString()]}
      colors={["green"]}
      className="h-[150px] w-full"
      valueFormatter={
        formatter ? (value) => formatter(value) : (val) => `${val} PRs`
      }
      curveType="monotone"
      autoMinValue
      showAnimation
    />
  );
};
