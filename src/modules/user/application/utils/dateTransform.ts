import { formatInTimeZone } from "date-fns-tz";

export function transformDateToUserTimezone(
  date: Date,
  timezone: string,
): Date {
  const formattedDate = formatInTimeZone(date, timezone, "yyyy-MM-dd HH:mm:ss");
  return new Date(formattedDate);
}
