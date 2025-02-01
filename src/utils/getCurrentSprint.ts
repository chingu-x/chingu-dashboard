// TODO: remove when architecture refactor is finished

import type { Sprints } from "@chingu-x/modules/sprints";
import { isWithinInterval } from "date-fns";

export const currentDate =
  process.env.NODE_ENV === "development" ? new Date(2024, 8, 20) : new Date();

export function getCurrentSprint(
  sprints: {
    id: number;
    number: number;
    startDate: string;
    endDate: string;
    teamMeetings: number[];
  }[],
) {
  const currentSprint = sprints.find((sprint) =>
    isWithinInterval(currentDate, {
      start: sprint.startDate,
      end: sprint.endDate,
    }),
  );

  return currentSprint;
}
