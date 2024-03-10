import { formatInTimeZone } from "date-fns-tz";

export function getTimezone(name: string) {
  console.log("asd");
  return formatInTimeZone(new Date(), name, "HH:mm zzz");
}
