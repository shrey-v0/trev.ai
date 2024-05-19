import type { TEventType } from "@trev/db/src/schema";

import { SimpleDonutChart } from "./simple-donut";

type SimpleDonutData = {
  activity_type: TEventType;
  events: number;
};

const SimpleDonutWrapper = ({
  data,
  category,
}: {
  data: SimpleDonutData[];
  category: keyof SimpleDonutData;
}) => {
  return (
    <div className="flex items-center gap-2">
      <SimpleDonutChart data={data} category={category} />
    </div>
  );
};

export default SimpleDonutWrapper;
