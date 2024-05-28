import { toZonedTime } from "date-fns-tz";

// Returns a Date which will format as a specific UTC time or date in the given time zone (a user's timezone).
export default function convertStringToDate(
  dateTime: string,
  timezone: string
) {
  return toZonedTime(dateTime, timezone);
}
