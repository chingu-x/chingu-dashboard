import { RocketLaunchIcon } from "@heroicons/react/24/solid";
import React from "react";

function Legend() {
  return (
    <div className="flex flex-col gap-y-[10px] pt-4">
      <div className="flex gap-x-[35px]">
        <div className="flex items-center gap-x-3">
          <div className="h-6 w-6 bg-primary" />
          <p className="text-base font-medium">Selected Day</p>
        </div>
        <div className="flex items-center gap-x-3">
          <RocketLaunchIcon className="h-4 w-4" />
          <p className="text-base font-medium">Voyage Start/End</p>
        </div>
      </div>
      <div className="flex gap-x-[35px]">
        <div className="flex items-center gap-x-3">
          <div className="h-6 w-6 bg-primary-content" />
          <p className="text-base font-medium">Current Week</p>
        </div>
        <div className="flex items-center gap-x-3">
          <div className="h-3 w-3 rounded-full bg-neutral" />
          <p className="text-base font-medium">Event</p>
        </div>
      </div>
    </div>
  );
}

export default Legend;
