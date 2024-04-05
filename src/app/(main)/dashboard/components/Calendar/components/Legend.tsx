import { RocketLaunchIcon } from "@heroicons/react/24/solid";
import React from "react";

function Legend() {
  return (
    <div className="flex flex-col gap-y-[10px] pt-4">
      <div className="flex gap-x-[35px]">
        <div className="flex items-center gap-x-3">
          <div className="w-6 h-6 bg-primary" />
          <p className="text-base font-medium">Selected Day</p>
        </div>
        <div className="flex items-center gap-x-3">
          <RocketLaunchIcon className="w-4 h-4" />
          <p className="text-base font-medium">Voyage Start/End</p>
        </div>
      </div>
      <div className="flex gap-x-[35px]">
        <div className="flex items-center gap-x-3">
          <div className="w-6 h-6 bg-primary-content" />
          <p className="text-base font-medium">Current Week</p>
        </div>
        <div className="flex items-center gap-x-3">
          <div className="w-3 h-3 bg-neutral rounded-full" />
          <p className="text-base font-medium">Event</p>
        </div>
      </div>
    </div>
  );
}

export default Legend;
