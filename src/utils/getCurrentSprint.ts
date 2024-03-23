import { isWithinInterval, parseISO } from "date-fns";
import { Sprint } from "@/store/features/sprint/sprintSlice";

export default function getCurrentSprint(sprints: Sprint[]) {
  // TODO: change to new Date() later
  const currentDate = new Date("2024-02-05T00:00:00.000");
  const currentSprint = sprints.find((sprint) => {
    const startDate = parseISO(
      sprint.startDate.substring(0, sprint.startDate.length - 1),
    );
    const endDate = parseISO(
      sprint.endDate.substring(0, sprint.endDate.length - 1),
    );
    if (isWithinInterval(currentDate, { start: startDate, end: endDate }))
      return true;
    return false;
  });
  return currentSprint;
}
