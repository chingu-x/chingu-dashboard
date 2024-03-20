"use client";

import { formatInTimeZone } from "date-fns-tz";
import { useUser } from "@/store/hooks";

interface DateTimeComponentWrapper {
  dateTime: string;
}

export default function DateTimeComponent({
  dateTime,
}: DateTimeComponentWrapper) {
  const { timezone } = useUser();

  const getMeetingTime = () => {
    return formatInTimeZone(dateTime, timezone, "k:m (zzz)");
  };
  return <>{getMeetingTime()}</>;
}
