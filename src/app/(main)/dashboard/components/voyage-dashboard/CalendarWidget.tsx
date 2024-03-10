import React from "react";
import SprintItem from "./SprintItem";
import Button from "@/components/Button";

export type Event = {
  title: string;
  link: string;
};
interface CalendarWidgetProps {
  sprintWeek?: number;
  eventList?: Event[];
}
function CalendarWidget({ sprintWeek = 1, eventList }: CalendarWidgetProps) {
  return (
    <div className="w-full h-full bg-base-200 rounded-2xl flex flex-row">
      <div className="min-w-[400px] min-h-[475px] flex justify-center items-center w-full flex-grow-3">
        Calendar placeholder
      </div>
      <div className="p-6 flex flex-col justify-between w-full flex-grow-2 border-l">
        <div>
          <p className="text-xl font-semibold pb-3">Wednesday, May 4</p>
          <p className="rounded-lg bg-primary-content p-3 text-base font-medium w-full">
            Sprint Week {sprintWeek}
          </p>
          {eventList?.map((event) => (
            <div key={event.title}>
              <SprintItem title={event.title} link={event.link} />
            </div>
          ))}
        </div>
        <Button className="self-end p-1 rounded text-base font-medium">
          Today
        </Button>
      </div>
    </div>
  );
}

export default CalendarWidget;
