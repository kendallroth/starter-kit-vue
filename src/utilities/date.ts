import dayjs from "dayjs";

export const formatDate = (date: string | Date, format = "MMM D, YYYY") => {
  if (!date) return "";

  return dayjs(date).format(format);
};
