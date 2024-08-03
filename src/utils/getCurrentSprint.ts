import { isWithinInterval } from "date-fns";

import { type Sprint } from "@/store/features/sprint/sprintSlice";

export const currentDate = new Date(2024, 5, 10, 12);
// export const currentDate = new Date();

export function getCurrentSprint(sprints: Sprint[]) {
  const currentSprint = sprints.find((sprint) =>
    isWithinInterval(currentDate, {
      start: sprint.startDate,
      end: sprint.endDate,
    }),
  );

  return currentSprint;
}
