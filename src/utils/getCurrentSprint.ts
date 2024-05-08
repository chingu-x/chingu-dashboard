import { isWithinInterval, parseISO } from "date-fns";

import { Sprint } from "@/store/features/sprint/sprintSlice";

function convertFromISOStringToDateWithoutTimezone(dateTime: string) {
  return parseISO(dateTime.substring(0, dateTime.length - 1));
}

export function getCurrentSprint(sprints: Sprint[]) {
  // TODO: change to new Date() later
  // const currentDate = new Date().toUTCString();
  const currentDate = new Date("2024-02-13T00:00:00.000Z");
  const currentSprint = sprints.find((sprint) => {
    const startDate = convertFromISOStringToDateWithoutTimezone(
      sprint.startDate,
    );
    const endDate = convertFromISOStringToDateWithoutTimezone(sprint.endDate);
    if (isWithinInterval(currentDate, { start: startDate, end: endDate }))
      return true;
    return false;
  });
  return currentSprint;
}
