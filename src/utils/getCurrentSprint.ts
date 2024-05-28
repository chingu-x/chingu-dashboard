import { isWithinInterval } from "date-fns";

import { type Sprint } from "@/store/features/sprint/sprintSlice";

export function getCurrentSprint(sprints: Sprint[]) {
  const currentDate = new Date();
  const currentSprint = sprints.find((sprint) => {
    if (
      isWithinInterval(currentDate, {
        start: sprint.startDate,
        end: sprint.endDate,
      })
    )
      return true;
    return false;
  });
  return currentSprint;
}
