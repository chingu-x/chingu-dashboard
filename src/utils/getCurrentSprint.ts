import { addDays, isAfter, isBefore, parseISO } from "date-fns";
import { Sprint } from "@/store/features/sprint/sprintSlice";

export default function getCurrentSprint(sprints: Sprint[]) {
  const currentDate = addDays(new Date(), 1);
  const currentSprintNumber = sprints.filter(
    (sprint) =>
      isAfter(currentDate, parseISO(sprint.startDate)) &&
      isBefore(currentDate, parseISO(sprint.endDate))
  );
  return currentSprintNumber[0];
}
