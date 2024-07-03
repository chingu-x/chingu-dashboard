import { isSameDay, isBefore, isWithinInterval } from "date-fns";

import type { EventList } from "@/app/(main)/dashboard/components/voyage-dashboard/getDashboardData";
import type { Sprint } from "@/store/features/sprint/sprintSlice";
import { useUser } from "@/store/hooks";
import convertStringToDate from "@/utils/convertStringToDate";
import routePaths from "@/utils/routePaths";

export const useEventsLogic = (
  selectedDate: Date,
  sprintsData?: Sprint[],
  currentSprintNumber?: number | null,
  meetingsData?: EventList[],
  voyageNumber?: number | null,
  teamId?: string,
) => {
  const { timezone } = useUser();
  let selectedSprint = null;

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

  const isWithinSprintRange = (date: Date) => {
    if (currentSprintStartDate && currentSprintEndDate) {
      return isWithinInterval(date, {
        start: convertStringToDate(currentSprintStartDate, timezone),
        end: convertStringToDate(currentSprintEndDate, timezone),
      });
    }
  };

  if (sprintsData) {
    for (const sprint of sprintsData) {
      const startDate = convertStringToDate(sprint.startDate, timezone);
      const endDate = convertStringToDate(sprint.endDate, timezone);
      // console.log("start date", startDate);
      // console.log("selected date", selectedDate);

      if (selectedDate >= startDate && selectedDate <= endDate) {
        selectedSprint = sprint.number;
        break;
      }
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
      check: meetingsData?.some((event) => isSameDay(event.date, date)),
    },
    {
      id: 2,
      check: sprintsData?.some((day) =>
        isSameDay(convertStringToDate(day.endDate, timezone), date),
      ),
      label: "Weekly Check-in Due",
      link: weeklyCheckInLink(),
      isDisabled: isBefore(date, new Date()),
    },
    {
      id: 3,
      check: voyageEndDate
        ? isSameDay(convertStringToDate(voyageEndDate, timezone), date)
        : false,
      label: "Voyage Submission Due",
      link: submitVoyageLink(),
    },
  ];

  const showRocketIcon = (date: Date) =>
    (voyageStartDate &&
      isSameDay(convertStringToDate(voyageStartDate, timezone), date)) ||
    (voyageEndDate &&
      isSameDay(convertStringToDate(voyageEndDate, timezone), date));

  const getDayLabel = () => {
    if (
      voyageStartDate &&
      isSameDay(convertStringToDate(voyageStartDate, timezone), selectedDate)
    )
      return `Start of Voyage ${voyageNumber}`;
    if (
      voyageEndDate &&
      isSameDay(convertStringToDate(voyageEndDate, timezone), selectedDate)
    )
      return `End of Voyage ${voyageNumber}`;
  };

  return {
    isWithinSprintRange,
    showDotConditions,
    showRocketIcon,
    getDayLabel,
    selectedSprint,
  };
};
