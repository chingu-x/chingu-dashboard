import { isWithinInterval } from "date-fns";

import convertStringToDate from "./convertStringToDate";
import { type Sprint } from "@/store/features/sprint/sprintSlice";

export function getCurrentSprint(sprints: Sprint[]) {
  // TODO: change to new Date() later
  const currentDate = new Date("2024-02-05T00:00:00.000");
  const currentSprint = sprints.find((sprint) => {
    const startDate = convertStringToDate(sprint.startDate);
    const endDate = convertStringToDate(sprint.endDate);
    if (isWithinInterval(currentDate, { start: startDate, end: endDate }))
      return true;
    return false;
  });
  return currentSprint;
}
