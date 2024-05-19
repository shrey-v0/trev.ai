"use client";

import { Legend } from "@tremor/react";
import { Calendar } from "lucide-react";

import { SearchParamsPreset } from "../dashboard/search-params-preset";

const ActivityBar = () => {
  return (
    <div className="flex w-full flex-row flex-wrap justify-between gap-3">
      <SearchParamsPreset
        defaultValue="7 days"
        searchParam="timeRange"
        values={["7 days", "14 days", "21 days"]}
        icon={<Calendar className="h-4 w-4" />}
        disabled
      />
      <Legend
        categories={[
          "PR Open",
          "PR Merged",
          "PR Reviewd",
          "PR Commnts",
          "Commits",
        ]}
        colors={["blue", "cyan", "indigo", "violet", "fuchsia"]}
      />
    </div>
  );
};

export default ActivityBar;
