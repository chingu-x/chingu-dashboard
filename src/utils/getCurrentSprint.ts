import { isWithinInterval } from "date-fns";

import { type Sprint } from "@/store/features/sprint/sprintSlice";

export function getCurrentSprint(sprints: Sprint[]) {
  const currentDate = new Date();
  const currentSprint = sprints.find((sprint) => {
    const startDate = new Date(sprint.startDate);
    const endDate = new Date(sprint.endDate);
    if (isWithinInterval(currentDate, { start: startDate, end: endDate }))
      return true;
    return false;
  });
  return currentSprint;
}
