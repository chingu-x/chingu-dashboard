import React from "react";
import type { EventList } from "./getDashboardData";
import Calendar from "@/app/(main)/dashboard/components/Calendar/Calendar";
import type { Sprint } from "@/store/features/sprint/sprintSlice";

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
    <div className="flex h-full w-full flex-row rounded-2xl border-2 border-base-100 bg-base-200">
      <div className="flex w-full grow-[3] items-center justify-center">
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
