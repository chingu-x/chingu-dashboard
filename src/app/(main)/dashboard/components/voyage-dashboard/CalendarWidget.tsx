import React from "react";
import type { EventList } from "./getDashboardData";
import Calendar from "@/app/(main)/dashboard/components/Calendar/Calendar";
import type { Sprint } from "@/store/features/sprint/sprintSlice";

interface CalendarWidgetProps {
  sprintsData?: Sprint[];
  currentSprintNumber?: number | null;
  meetingsData?: EventList[];
  voyageNumber?: number | null;
  teamId?: string;
  currentMeetingId?: number | null;
}

function CalendarWidget({
  sprintsData,
  currentSprintNumber,
  meetingsData,
  voyageNumber,
  teamId,
  currentMeetingId,
}: CalendarWidgetProps) {
  return (
    <div className="w-full h-full bg-base-200 rounded-2xl flex flex-row border-2 border-base-100">
      <div className="flex justify-center items-center w-full flex-grow-3">
        <Calendar
          sprintsData={sprintsData}
          currentSprintNumber={currentSprintNumber}
          meetingsData={meetingsData}
          voyageNumber={voyageNumber}
          teamId={teamId}
          currentMeetingId={currentMeetingId}
        />
      </div>
    </div>
  );
}

export default CalendarWidget;
