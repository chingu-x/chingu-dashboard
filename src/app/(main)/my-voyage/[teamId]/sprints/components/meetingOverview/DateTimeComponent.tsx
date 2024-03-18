"use client";

import { format } from "date-fns";
// import { utcToZonedTime } from "date-fns-tz";
// import { useUser } from "@/store/hooks";

interface DateTimeComponentWrapper {
  dateTime: string;
}

export default function DateTimeComponent({
  dateTime,
}: DateTimeComponentWrapper) {
  // const { timezone } = useUser();
  const getMeetingTime = () => {
    console.log(dateTime);

    // const convertedTime = utcToZonedTime(dateTime, timezone);
    // console.log(convertedTime);

    return format(dateTime, "k:m");
  };
  return <>{getMeetingTime()}</>;
}
