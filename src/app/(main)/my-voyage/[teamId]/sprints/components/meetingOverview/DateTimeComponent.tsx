"use client";

import { useEffect, useState } from "react";
import { format, isToday, isTomorrow } from "date-fns";
import { formatInTimeZone, utcToZonedTime } from "date-fns-tz";
import { CalendarDaysIcon, ClockIcon } from "@heroicons/react/24/outline";
import { useUser } from "@/store/hooks";

interface DateTimeComponentWrapper {
  dateTime: string;
}

export default function DateTimeComponent({
  dateTime,
}: DateTimeComponentWrapper) {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const { timezone } = useUser();

  const getMeetingDate = () => {
    const dateTimeConverted = new Date(utcToZonedTime(dateTime, timezone));
    if (isToday(dateTimeConverted)) return "today";
    if (isTomorrow(dateTimeConverted)) return "tomorrow";
    return format(dateTimeConverted, "MMM, d");
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <p className="flex items-center gap-x-2">
        <CalendarDaysIcon className="w-[15px] h-[15px]" />
        {getMeetingDate()}
      </p>
      <p className="flex items-center gap-x-2">
        <ClockIcon className="w-[15px] h-[15px]" />
        {formatInTimeZone(dateTime, timezone, "k:mm (zzz)")}
      </p>
    </>
  );
}
