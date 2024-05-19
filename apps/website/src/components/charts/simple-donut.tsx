import { DonutChart } from "@tremor/react";


interface SimpleDonutChartProps<TData> {
  data: TData[];
  category: keyof TData;
}

export const SimpleDonutChart = <TData,>({
  data,
  category,
}: SimpleDonutChartProps<TData>) => {
  console.log(data);
  return (
    <>
      <div className="flex items-center justify-center">
        <DonutChart
          data={data}
          category={category.toString()}
          index="activity_type"
          colors={["blue", "cyan", "indigo", "violet", "fuchsia"]}
          className="w-20"
        />
      </div>
    </>
  );
};
