import { addDays, isAfter, isBefore } from "date-fns";
import { Sprint } from "@/store/features/sprint/sprintSlice";

export default function getCurrentSprint(sprints: Sprint[]) {
  const currentDate = addDays(new Date(), 1);
  const currentSprintNumber = sprints.filter(
    (sprint) =>
      isAfter(currentDate, sprint.startDate) &&
      isBefore(currentDate, sprint.endDate),
  );
  return currentSprintNumber[0];
}
