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
import { EventList } from "@/app/(main)/dashboard/components/voyage-dashboard/dashboardService";
import { Sprint } from "@/store/features/sprint/sprintSlice";

export const useCalendarLogic = (
  sprintsData?: Sprint[],
  currentSprintNumber?: number,
  meetingsData?: EventList[],
) => {
  const currentDate = new Date();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);
  const [isHoveredDate, setIsHoveredDate] = useState<Date | null>(null);

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

  const voyageStartDate = sprintsData?.find(
    (sprint) => Number(sprint.number) === 1,
  )?.startDate;
  const voyageEndDate = sprintsData?.find(
    (sprint) => Number(sprint.number) === 6,
  )?.endDate;

  const currentSprintStartDate = sprintsData?.find(
    (sprint) => Number(sprint.number) === currentSprintNumber,
  )?.startDate;

  const currentSprintEndDate = sprintsData?.find(
    (sprint) => Number(sprint.number) === currentSprintNumber,
  )?.endDate;

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

  const isSelectedDate = (date: Date) => isSameDay(selectDate, date);

  const generateClassString = (date: Date, currentMonth: boolean) => {
    let classes =
      "h-[50px] w-[48px] grid place-content-center transition-all cursor-pointer select-none";

    const isWithinSprintRange =
      currentSprintStartDate &&
      currentSprintEndDate &&
      (isSameDay(date, startOfDay(new Date(currentSprintStartDate))) ||
        isAfter(date, startOfDay(new Date(currentSprintStartDate)))) &&
      isBefore(date, endOfDay(new Date(currentSprintEndDate)));

    if (!currentMonth) {
      classes += " text-neutral-content";
    }

    if (isSelectedDate(date)) {
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
      check: meetingsData?.some((event) =>
        isSameDay(new Date(event.date), date),
      ),
    },
  ];

  const showRocketIcon = (date: Date) =>
    (voyageStartDate && isSameDay(new Date(voyageStartDate), date)) ||
    (voyageEndDate && isSameDay(new Date(voyageEndDate), date));

  const getCalendarElementColor = (date: Date, currentMonth: boolean) => {
    if (isSelectedDate(date)) {
      return "base-200";
    } else if (date.getTime() === isHoveredDate?.getTime()) {
      return "neutral";
    } else if (!currentMonth) {
      return "neutral-content";
    } else {
      return "neutral-focus";
    }
  };

  const onDotClick = (date: Date) => {
    if (setSelectDate && date) {
      setSelectDate(date);
    }
  };

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
    showRocketIcon,
    getCalendarElementColor,
    setIsHoveredDate,
    onDotClick,
  };
};
