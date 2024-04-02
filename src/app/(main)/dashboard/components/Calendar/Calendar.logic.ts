import {
  format,
  startOfMonth,
  endOfMonth,
  getDay,
  getDate,
  getMonth,
  getYear,
  isSameDay,
  isAfter,
  isBefore,
  addMonths,
  startOfDay,
  endOfDay,
} from "date-fns";
import { useState } from "react";
import { SprintData } from "@/app/(main)/dashboard/mocks/voyageDashboardData";

export const useCalendarLogic = (sprintData?: SprintData) => {
  const currentDate = new Date();
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

  const generateDate = (
    month = getMonth(new Date()),
    year = getYear(new Date()),
  ) => {
    const firstDateOfMonth = startOfMonth(new Date(year, month));
    const lastDateOfMonth = endOfMonth(new Date(year, month));

    const arrayOfDate = [];

    // Create prefix date
    for (let i = 1; i < getDay(firstDateOfMonth); i++) {
      const date = new Date(year, month, -i);

      arrayOfDate.unshift({
        currentMonth: false,
        date,
      });
    }

    // Generate current date
    for (let i = 1; i <= getDate(lastDateOfMonth); i++) {
      const date = new Date(year, month, i);
      arrayOfDate.push({
        currentMonth: true,
        date,
        today: isSameDay(date, new Date()),
      });
    }

    const remaining = 42 - arrayOfDate.length;

    for (let i = 1; i <= remaining; i++) {
      arrayOfDate.push({
        currentMonth: false,
        date: new Date(year, month + 1, i),
      });
    }
    return arrayOfDate;
  };

  const generateClassString = (date: Date, currentMonth: boolean) => {
    let classes =
      "h-[50px] w-[48px] grid place-content-center transition-all cursor-pointer select-none";

    const isSelectedDate = isSameDay(selectDate, date);
    const isWithinSprintRange =
      sprintData &&
      (isSameDay(date, startOfDay(sprintData?.startDate)) ||
        isAfter(date, startOfDay(sprintData?.startDate))) &&
      isBefore(date, endOfDay(sprintData?.endDate));

    if (!currentMonth) {
      classes += " text-neutral-content";
    }

    if (isSelectedDate) {
      classes += " bg-primary text-base-200";
    } else {
      classes += " hover:bg-base-100";
      if (isWithinSprintRange) {
        classes += " bg-primary-content";
      }
    }

    return classes;
  };

  const selectedDate = format(selectDate, "EEEE, MMMM do");

  const showDotConditions = (date: Date) => [
    {
      id: 1,
      check: sprintData?.startDate
        ? isSameDay(sprintData.startDate, date)
        : false,
      color: "bg-success",
    },
    {
      id: 2,
      check: sprintData?.eventList?.some((event) =>
        isSameDay(new Date(event.date), date),
      ),
    },
  ];

  return {
    cn,
    generateDate,
    generateClassString,
    days,
    today,
    setToday,
    selectDate,
    setSelectDate,
    currentDate,
    onArrowClick: (month: number) => setToday(addMonths(today, month)),
    currentMonth: months[getMonth(today)],
    currentYear: getYear(today),
    selectedDate,
    showDotConditions,
  };
};
