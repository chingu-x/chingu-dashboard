import { isWithinInterval } from "date-fns";

import { type Sprint } from "@/store/features/sprint/sprintSlice";

const currentDate = new Date(2024, 5, 15);

export function getCurrentSprint(sprints: Sprint[]) {
  const currentDate = new Date();
  const currentSprint = sprints.find((sprint) =>
    isWithinInterval(currentDate, {
      start: sprint.startDate,
      end: currentDate,
    }),
  );
  return currentSprint;
}
