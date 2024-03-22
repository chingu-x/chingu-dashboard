import React from "react";
import dayjs from "dayjs";
import type { Event } from "./mocks/voyageDashboardData";
import Calendar from "./Calendar/Calendar";

interface CalendarWidgetProps {
  sprintWeek?: number;
  eventList?: Event[] | null;
}

function CalendarWidget({ sprintWeek = 1, eventList }: CalendarWidgetProps) {
  const mockSprintRange = {
    start: dayjs().subtract(3, "day"),
    end: dayjs().add(1, "day"),
  };

  return (
    <div className="w-full h-full bg-base-200 rounded-2xl flex flex-row">
      <div className="flex justify-center items-center w-full flex-grow-3">
        <Calendar
          sprintWeek={sprintWeek}
          eventList={eventList}
          sprintRange={mockSprintRange}
        />
      </div>
    </div>
  );
}

export default CalendarWidget;
