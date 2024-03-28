import dayjs from "dayjs";
import { useState } from "react";
import { SprintData } from "@/app/(main)/dashboard/mocks/voyageDashboardData";

export const useCalendarLogic = (sprintData?: SprintData) => {
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
  ) => {
    let classes =
      "h-[50px] w-[48px] grid place-content-center hover:bg-base-100 transition-all cursor-pointer select-none";

    const isSelectedDate =
      selectDate.toDate().toDateString() === date.toDate().toDateString();
    const isWithinSprintRange =
      sprintData &&
      (date.isSame(sprintData?.startDate.startOf("day")) ||
        date.isAfter(sprintData?.startDate.startOf("day"))) &&
      date.isBefore(sprintData?.endDate.endOf("day"));

    if (!currentMonth) {
      classes += " text-neutral-content";
    }

    if (isSelectedDate) {
      classes += " bg-primary text-base-200";
    } else if (isWithinSprintRange && !today) {
      classes += " bg-primary-content";
    }

    if (today) {
      classes += " bg-primary text-base-200";
    }

    return classes;
  };

  const selectedDate = selectDate.toDate().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const showDotConditions = (date: dayjs.Dayjs) => [
    {
      id: 1,
      check: sprintData?.startDate.isSame(date, "day"),
      color: "bg-success",
    },
    {
      id: 2,
      check: sprintData?.eventList?.some((event) =>
        dayjs(event.date, "YYYY-MM-DD h:mm A").isSame(date, "day"),
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
    onArrowClick: (month: number) => setToday(today.month(month)),
    currentMonth: months[today.month()],
    currentYear: today.year(),
    selectedDate,
    showDotConditions,
  };
};
