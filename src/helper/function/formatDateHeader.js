import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";

dayjs.extend(relativeTime);
dayjs.extend(isToday);
dayjs.extend(isYesterday);

const formatDateHeader = (date) => {
  const d = dayjs(date);
  if (d.isToday()) return "Today";
  if (d.isYesterday()) return "Yesterday";
  return d.format("dddd, MMM D");
};

export { formatDateHeader };
