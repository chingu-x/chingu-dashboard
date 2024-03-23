import dayjs from "dayjs";
import { useState } from "react";

export const useCalendarLogic = () => {
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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

  const cn = (...classes: string[]) => classes.filter(Boolean).join(" ");

  const generateDate = (month = dayjs().month(), year = dayjs().year()) => {
    const firstDateOfMonth = dayjs().year(year).month(month).startOf("month");
    const lastDateOfMonth = dayjs().year(year).month(month).endOf("month");

    const arrayOfDate = [];

    // Create prefix date
    for (let i = 0; i < firstDateOfMonth.day(); i++) {
      const date = firstDateOfMonth.day(i);

      arrayOfDate.push({
        currentMonth: false,
        date,
      });
    }

    // Generate current date
    for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
      arrayOfDate.push({
        currentMonth: true,
        date: firstDateOfMonth.date(i),
        today:
          firstDateOfMonth.date(i).toDate().toDateString() ===
          dayjs().toDate().toDateString(),
      });
    }

    const remaining = 42 - arrayOfDate.length;

    for (
      let i = lastDateOfMonth.date() + 1;
      i <= lastDateOfMonth.date() + remaining;
      i++
    ) {
      arrayOfDate.push({
        currentMonth: false,
        date: lastDateOfMonth.date(i),
      });
    }
    return arrayOfDate;
  };

  const generateClassString = (
    date: dayjs.Dayjs,
    currentMonth: boolean,
    today: boolean = false,
    selectDate: dayjs.Dayjs,
    startSprintDate?: dayjs.Dayjs | null,
    endSprintDate?: dayjs.Dayjs | null,
  ) => {
    let classes =
      "h-[50px] w-[48px] grid place-content-center hover:bg-base-100 transition-all cursor-pointer select-none";

    const isSelectedDate =
      selectDate.toDate().toDateString() === date.toDate().toDateString();
    const isWithinSprintRange =
      startSprintDate &&
      endSprintDate &&
      (date.isSame(startSprintDate.startOf("day")) ||
        date.isAfter(startSprintDate.startOf("day"))) &&
      date.isBefore(endSprintDate.endOf("day"));

    if (!currentMonth) {
      classes += " text-gray-400";
    }

    if (isSelectedDate) {
      classes += " bg-primary text-white";
    } else if (isWithinSprintRange && !today) {
      classes += " bg-primary-content";
    }

    if (today) {
      classes += " bg-primary text-white";
    }

    return classes;
  };

  return {
    cn,
    generateDate,
    months,
    generateClassString,
    days,
    today,
    setToday,
    selectDate,
    setSelectDate,
    currentDate,
  };
};
