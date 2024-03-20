"use client";

import { useEffect, useState } from "react";
import { formatInTimeZone } from "date-fns-tz";
import { useUser } from "@/store/hooks";

interface DateTimeComponentWrapper {
  dateTime: string;
}

export default function DateTimeComponent({
  dateTime,
}: DateTimeComponentWrapper) {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const { timezone } = useUser();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const getMeetingTime = () => {
    return formatInTimeZone(dateTime, timezone, "k:mm (zzz)");
  };
  return <>{getMeetingTime()}</>;
}
