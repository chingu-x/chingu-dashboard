// TODO: remove when architecture refactor is finished

import { isWithinInterval } from "date-fns";

import { type Sprint } from "@/store/features/sprint/sprintSlice";

export const currentDate =
  process.env.NODE_ENV === "development" ? new Date(2024, 8, 10) : new Date();

export function getCurrentSprint(sprints: Sprint[]) {
  const currentSprint = sprints.find((sprint) =>
    isWithinInterval(currentDate, {
      start: sprint.startDate,
      end: sprint.endDate,
    }),
  );

  return currentSprint;
}
