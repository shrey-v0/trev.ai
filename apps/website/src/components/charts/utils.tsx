import { format } from "date-fns";

export const dateFormatter = (date: string) => {
  return format(new Date(date), "yyyy-MM-dd");
};
