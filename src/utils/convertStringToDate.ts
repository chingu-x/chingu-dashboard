import { parseISO } from "date-fns";

export default function convertStringToDate(dateTime: string) {
  return parseISO(dateTime.substring(0, dateTime.length - 1));
}
