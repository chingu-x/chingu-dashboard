import React from "react";
import type { SprintData } from "./mocks/voyageDashboardData";
import Calendar from "./Calendar/Calendar";

interface CalendarWidgetProps {
  sprintData?: SprintData | null;
}

function CalendarWidget({ sprintData }: CalendarWidgetProps) {
  return (
    <div className="w-full h-full bg-base-200 rounded-2xl flex flex-row">
      <div className="flex justify-center items-center w-full flex-grow-3">
        <Calendar sprintData={sprintData} />
      </div>
    </div>
  );
}

export default CalendarWidget;
