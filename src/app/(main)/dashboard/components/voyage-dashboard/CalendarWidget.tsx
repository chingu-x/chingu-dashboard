import React from "react";
import Calendar from "@/app/(main)/dashboard/components/Calendar/Calendar";
import type { SprintData } from "@/app/(main)/dashboard/mocks/voyageDashboardData";

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
