import React from "react";
import type { Event, SprintData } from "./mocks/voyageDashboardData";
import Calendar from "./Calendar/Calendar";

interface CalendarWidgetProps {
  sprintWeek?: number;
  eventList?: Event[] | null;
  sprintRange?: SprintData | null;
}

function CalendarWidget({
  sprintWeek = 1,
  eventList,
  sprintRange,
}: CalendarWidgetProps) {
  return (
    <div className="w-full h-full bg-base-200 rounded-2xl flex flex-row">
      <div className="flex justify-center items-center w-full flex-grow-3">
        <Calendar
          sprintWeek={sprintWeek}
          eventList={eventList}
          sprintRange={sprintRange}
        />
      </div>
    </div>
  );
}

export default CalendarWidget;
