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
  subDays,
} from "date-fns";
import { useState } from "react";
import type { EventList } from "@/app/(main)/dashboard/components/voyage-dashboard/getDashboardData";
import type { Sprint } from "@/store/features/sprint/sprintSlice";
import { useUser } from "@/store/hooks";
import convertStringToDate from "@/utils/convertStringToDate";

export const useCalendarLogic = (
  sprintsData?: Sprint[],
  currentSprintNumber?: number | null,
  meetingsData?: EventList[],
  voyageNumber?: number | null,
) => {
  const { currentDate, timezone } = useUser();
  const userDate = currentDate ?? new Date();
  const [today, setToday] = useState(userDate);
  const [selectDate, setSelectDate] = useState(userDate);
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
    let firstDayOfWeek = getDay(firstDateOfMonth);
    while (firstDayOfWeek > 0) {
      const date = subDays(firstDateOfMonth, firstDayOfWeek);
      arrayOfDate.unshift({
        currentMonth: false,
        date,
      });
      firstDayOfWeek--;
    }
    arrayOfDate.reverse();

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
      (isSameDay(
        date,
        startOfDay(convertStringToDate(currentSprintStartDate, timezone)),
      ) ||
        isAfter(
          date,
          startOfDay(convertStringToDate(currentSprintStartDate, timezone)),
        )) &&
      isBefore(
        date,
        endOfDay(convertStringToDate(currentSprintEndDate, timezone)),
      );

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

  let selectedSprint = null;
  for (const sprint of sprintsData!) {
    const startDate = new Date(sprint.startDate);
    const endDate = new Date(sprint.endDate);
    if (selectDate >= startDate && selectDate <= endDate) {
      selectedSprint = sprint.number;
      break;
    }
  }

  const showDotConditions = (date: Date) => [
    {
      id: 1,
      check: meetingsData?.some((event) =>
        isSameDay(new Date(event.date), date),
      ),
    },
    {
      id: 2,
      check: sprintsData?.some((day) => isSameDay(new Date(day.endDate), date)),
    },
    {
      id: 3,
      check: isSameDay(new Date(voyageEndDate!), date),
    },
  ];

  const showRocketIcon = (date: Date) =>
    (voyageStartDate &&
      isSameDay(convertStringToDate(voyageStartDate, timezone), date)) ||
    (voyageEndDate &&
      isSameDay(convertStringToDate(voyageEndDate, timezone), date));

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

  const getDayLabel = () => {
    if (
      voyageStartDate &&
      isSameDay(convertStringToDate(voyageStartDate, timezone), selectDate)
    )
      return `Start of Voyage ${voyageNumber}`;
    if (
      voyageEndDate &&
      isSameDay(convertStringToDate(voyageEndDate, timezone), selectDate)
    )
      return `End of Voyage ${voyageNumber}`;
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
    userDate,
    onArrowClick: (month: number) => setToday(addMonths(today, month)),
    currentMonth: months[getMonth(today)],
    currentYear: getYear(today),
    selectedDate,
    showDotConditions,
    showRocketIcon,
    getCalendarElementColor,
    setIsHoveredDate,
    onDotClick,
    getDayLabel,
    selectedSprint,
  };
};
