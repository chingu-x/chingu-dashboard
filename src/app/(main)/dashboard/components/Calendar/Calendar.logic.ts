import { useEffect, useState } from "react";

import {
  startOfMonth,
  endOfMonth,
  getDay,
  getDate,
  getMonth,
  getYear,
  addMonths,
  subDays,
} from "date-fns";
import { useUser } from "@/store/hooks";

export const useCalendarLogic = () => {
  const { currentDate } = useUser();
  const today = currentDate ?? new Date();

  const [date, setDate] = useState<Date>(today);
  const [selectedDate, setSelectedDate] = useState<Date>(today);

  useEffect(() => {
    if (today) {
      setDate(today);
      setSelectedDate(today);
    }
  }, [today]);

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const generateDates = (
    month = getMonth(new Date()),
    year = getYear(new Date()),
  ) => {
    const firstDateOfMonth = startOfMonth(new Date(year, month));
    const lastDateOfMonth = endOfMonth(new Date(year, month));

    const arrayOfDate = [];

    // Create prefix date
    let firstDayOfWeek = getDay(firstDateOfMonth);
    while (firstDayOfWeek > 0) {
      const date = subDays(firstDateOfMonth, firstDayOfWeek);
      arrayOfDate.unshift({
        isWithinSelectedMonth: false,
        date,
      });
      firstDayOfWeek--;
    }
    arrayOfDate.reverse();

    // Generate current date
    for (let i = 1; i <= getDate(lastDateOfMonth); i++) {
      const date = new Date(year, month, i);
      arrayOfDate.push({
        isWithinSelectedMonth: true,
        date,
      });
    }

    const remaining = 42 - arrayOfDate.length;

    for (let i = 1; i <= remaining; i++) {
      arrayOfDate.push({
        isWithinSelectedMonth: false,
        date: new Date(year, month + 1, i),
      });
    }

    return arrayOfDate;
  };

  // Handle arrow click (previous/next month)
  const handleArrowClick = (month: number) => {
    if (date) setDate(addMonths(date, month));
  };

  return {
    generateDates,
    weekdays,
    months,
    today,
    date,
    setDate,
    selectedDate,
    setSelectedDate,
    onArrowClick: (month: number) => handleArrowClick(month),
  };
};
