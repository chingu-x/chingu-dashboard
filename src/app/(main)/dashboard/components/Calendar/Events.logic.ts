import { useState } from "react";

import { isSameDay, isAfter, isBefore, startOfDay, endOfDay } from "date-fns";

import type { EventList } from "@/app/(main)/dashboard/components/voyage-dashboard/getDashboardData";
import type { Sprint } from "@/store/features/sprint/sprintSlice";
import { useUser } from "@/store/hooks";
import convertStringToDate from "@/utils/convertStringToDate";
import routePaths from "@/utils/routePaths";

export const useEventsLogic = (
  sprintsData?: Sprint[],
  currentSprintNumber?: number | null,
  meetingsData?: EventList[],
  voyageNumber?: number | null,
  teamId?: string,
) => {
  const { currentDate, timezone } = useUser();
  const userDate = currentDate ?? new Date();
  const [selectDate, setSelectDate] = useState(userDate);
  const [isHoveredDate, setIsHoveredDate] = useState<Date | null>(null);

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

  let selectedSprint = null;
  for (const sprint of sprintsData!) {
    const startDate = new Date(sprint.startDate);
    const endDate = new Date(sprint.endDate);
    if (selectDate >= startDate && selectDate <= endDate) {
      selectedSprint = sprint.number;
      break;
    }
  }

  const weeklyCheckInLink = () => {
    if (teamId && currentSprintNumber) {
      return routePaths.weeklyCheckInPage(
        teamId,
        currentSprintNumber?.toString(),
      );
    } else {
      return "";
    }
  };

  const submitVoyageLink = () => {
    if (teamId && currentSprintNumber) {
      return routePaths.submitVoyagePage(
        teamId,
        currentSprintNumber?.toString(),
      );
    } else {
      return "";
    }
  };

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
      label: "Weekly Check-in Due",
      link: weeklyCheckInLink(),
      isDisabled: isBefore(date, new Date()),
    },
    {
      id: 3,
      check: isSameDay(new Date(voyageEndDate!), date),
      label: "Voyage Submission Due",
      link: submitVoyageLink(),
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
    generateClassString,
    showDotConditions,
    showRocketIcon,
    getCalendarElementColor,
    setIsHoveredDate,
    onDotClick,
    getDayLabel,
    selectedSprint,
  };
};
