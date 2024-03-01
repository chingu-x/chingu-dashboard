import React from "react";
import Button from "@/components/Button";

function CalendarWidget() {
  return (
    <div className="w-full h-full bg-base-200 rounded-2xl flex flex-row">
      <div className="w-max-[500px] min-h-[475px] flex justify-center items-center w-full flex-grow-3">
        Calendar placeholder
      </div>
      <div className="p-6 flex flex-col justify-between w-full flex-grow-2 border-l">
        <div>
          <p className="text-xl font-semibold pb-3">Wednesday, May 4</p>
          <p className="rounded-lg bg-primary-content p-3 text-base font-medium w-[200px]">
            Sprint Week 1
          </p>
        </div>
        <Button className="self-end p-1 rounded text-base font-medium">
          Today
        </Button>
      </div>
    </div>
  );
}

export default CalendarWidget;
