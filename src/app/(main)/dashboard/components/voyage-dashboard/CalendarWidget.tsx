import React from "react";
import { EventList } from "./getDashboardData";
import Calendar from "@/app/(main)/dashboard/components/Calendar/Calendar";
import { Sprint } from "@/store/features/sprint/sprintSlice";

interface CalendarWidgetProps {
  sprintsData?: Sprint[];
  currentSprintNumber?: number | null;
  meetingsData?: EventList[];
  voyageNumber?: number | null;
}

function CalendarWidget({
  sprintsData,
  currentSprintNumber,
  meetingsData,
  voyageNumber,
}: CalendarWidgetProps) {
  return (
    <div className="w-full h-full bg-base-200 rounded-2xl flex flex-row border-2 border-base-100">
      <div className="flex justify-center items-center w-full flex-grow-3">
        <Calendar
          sprintsData={sprintsData}
          currentSprintNumber={currentSprintNumber}
          meetingsData={meetingsData}
          voyageNumber={voyageNumber}
        />
      </div>
    </div>
  );
}

export default CalendarWidget;
