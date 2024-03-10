import { formatInTimeZone } from "date-fns-tz";

export function getTimezone(name: string) {
  return formatInTimeZone(new Date(), name, "HH:mm zzz");
}
