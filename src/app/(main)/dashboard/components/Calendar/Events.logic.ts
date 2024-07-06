import { isSameDay, isBefore, format } from "date-fns";

import { type Event } from "./types/types";
import type { MeetingEvent } from "@/dashboard/components/voyage-dashboard/getDashboardData";
import type { Sprint } from "@/store/features/sprint/sprintSlice";
import { useUser } from "@/store/hooks";
import convertStringToDate from "@/utils/convertStringToDate";
import routePaths from "@/utils/routePaths";

export const useEventsLogic = (
  selectedDate: Date,
  sprintsData?: Sprint[],
  currentSprintNumber?: number | null,
  meetingsData?: MeetingEvent[],
  voyageNumber?: number | null,
  teamId?: string,
) => {
  const { timezone, currentDate } = useUser();

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

  const isWithinTwoDates = (date: Date, start: Date, end: Date) =>
    (isSameDay(date, start) || date >= start) &&
    (isSameDay(date, end) || date <= end);

  const isWithinSprintRange = (date: Date) => {
    if (currentSprintStartDate && currentSprintEndDate) {
      if (
        isWithinTwoDates(
          date,
          convertStringToDate(currentSprintStartDate, timezone),
          convertStringToDate(currentSprintEndDate, timezone),
        )
      ) {
        return true;
      }
      return false;
    }
  };

  const getSelectedSprint = () => {
    if (sprintsData) {
      for (const sprint of sprintsData) {
        const startDate = convertStringToDate(sprint.startDate, timezone);
        const endDate = convertStringToDate(sprint.endDate, timezone);

        if (isWithinTwoDates(selectedDate, startDate, endDate)) {
          return sprint.number;
        }
      }
    }
  };

  const getWeeklyCheckInLink = () => {
    if (teamId && currentSprintNumber) {
      return routePaths.weeklyCheckInPage(
        teamId,
        currentSprintNumber?.toString(),
      );
    } else {
      return "";
    }
  };

  const getSubmitVoyageLink = () => {
    if (teamId && currentSprintNumber) {
      return routePaths.submitVoyagePage(
        teamId,
        currentSprintNumber?.toString(),
      );
    } else {
      return "";
    }
  };

  const getMeetingEventData = (meetingsData: MeetingEvent[], date: Date) => {
    const meeting = meetingsData?.find((event) =>
      isSameDay(convertStringToDate(event.date, timezone), date),
    );

    if (meeting)
      return {
        ...meeting,
        date: format(convertStringToDate(meeting.date, timezone), "h:mm a"),
      };
    return undefined;
  };

  const getEvents = (date: Date): Event[] => {
    const events = [];
    const selectedSprint = getSelectedSprint();
    const meeting = meetingsData && getMeetingEventData(meetingsData, date);
    const weeklyCheckinDue = sprintsData?.some((sprint) =>
      isSameDay(convertStringToDate(sprint.endDate, timezone), date),
    );
    const voyageSubmissionDue =
      voyageEndDate &&
      isSameDay(convertStringToDate(voyageEndDate, timezone), date);

    if (
      voyageStartDate &&
      isSameDay(convertStringToDate(voyageStartDate, timezone), date)
    ) {
      events.push({
        id: 1,
        check: true,
        label: `Start of Voyage ${voyageNumber}`,
        showRocket: true,
      });
    }

    if (
      voyageEndDate &&
      isSameDay(convertStringToDate(voyageEndDate, timezone), date)
    ) {
      events.push({
        id: 2,
        check: true,
        label: `End of Voyage ${voyageNumber}`,
        showRocket: true,
      });
    }

    if (selectedSprint) {
      events.push({
        id: 3,
        check: true,
        label: `Sprint Week ${selectedSprint}`,
      });
    }

    if (meeting) {
      events.push({
        id: 4,
        check: true,
        meeting,
        showDot: true,
      });
    }

    if (weeklyCheckinDue) {
      events.push({
        id: 5,
        check: true,
        label: "Weekly Check-in Due",
        link: getWeeklyCheckInLink(),
        isDisabled: isBefore(date, currentDate ?? new Date()),
        showDot: true,
      });
    }

    if (voyageSubmissionDue) {
      events.push({
        id: 6,
        check: true,
        label: "Voyage Submission Due",
        link: getSubmitVoyageLink(),
        isDisabled: isBefore(date, currentDate ?? new Date()),
        showDot: true,
      });
    }

    return events;
  };

  return {
    isWithinSprintRange,
    getEvents,
  };
};
