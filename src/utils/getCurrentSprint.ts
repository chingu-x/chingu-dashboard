// import { addDays, isAfter, isBefore, parseISO } from "date-fns";
import { Sprint } from "@/store/features/sprint/sprintSlice";

export default function getCurrentSprint(sprints: Sprint[]) {
  // TODO: uncomment later
  // const currentDate = addDays(new Date(), 1);
  // const currentSprint = sprints.filter(
  //   (sprint) =>
  //     isAfter(currentDate, parseISO(sprint.startDate)) &&
  //     isBefore(currentDate, parseISO(sprint.endDate)),
  // );
  // return currentSprint[0];

  return sprints[3];
}
