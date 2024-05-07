"use client";

import { useEffect, useState } from "react";
import { getMonth, isToday, isTomorrow } from "date-fns";
import { format, formatInTimeZone } from "date-fns-tz";
import { CalendarDaysIcon, ClockIcon } from "@heroicons/react/24/outline";
import { useUser } from "@/store/hooks";
import convertStringToDate from "@/utils/convertStringToDate";

interface DateTimeComponentWrapper {
  dateTime: string;
}

export default function DateTimeComponent({
  dateTime,
}: DateTimeComponentWrapper) {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const { timezone } = useUser();
  const dateTimeConvertedToDate = convertStringToDate(dateTime);

  const getMeetingDate = () => {
    if (isToday(dateTimeConvertedToDate)) return "today";
    if (isTomorrow(dateTimeConvertedToDate)) return "tomorrow";
    if (getMonth(dateTimeConvertedToDate) === 4)
      return format(dateTimeConvertedToDate, "MMM d");
    return format(dateTimeConvertedToDate, "MMM. d");
  };

  const getMeetingTime = () => {
    const timezoneWithDaylightSaving = formatInTimeZone(
      new Date(),
      timezone,
      "zzz"
    );
    return `${format(dateTimeConvertedToDate, "k:mm", {
      timeZone: timezone,
    })} (${timezoneWithDaylightSaving})`;
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
        {getMeetingTime()}
      </p>
    </>
  );
}
