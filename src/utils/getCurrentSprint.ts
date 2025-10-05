import { isWithinInterval } from "date-fns";

import { type Sprint } from "@/store/features/sprint/sprintSlice";

// export const currentDate =
//   process.env.NODE_ENV === "development" ? new Date(2024, 11, 3) : new Date();

export function getCurrentSprint(sprints: Sprint[], mockDate?: Date) {
    const currentDate = mockDate || new Date();

    const currentSprint = sprints.find((sprint) =>
        isWithinInterval(currentDate, {
            start: sprint.startDate,
            end: sprint.endDate,
        }),
    );

    return currentSprint;
}
