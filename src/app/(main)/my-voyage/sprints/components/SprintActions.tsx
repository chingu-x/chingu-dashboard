import React from "react";
import {
  CalendarIcon,
  DocumentCheckIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";

import Button from "@/components/Button";

export default function SprintActions() {
  return (
    <div className="flex justify-between p-5 bg-base-100 rounded-2xl">
      <Button variant="secondary" size="lg">
        <RocketLaunchIcon className="h-[18px] w-[18px]" /> Submit Voyage
      </Button>
      <Button variant="primary" size="lg">
        <DocumentCheckIcon className="h-[18px] w-[18px]" /> Submit Check-in
      </Button>
      <Button variant="outline" size="lg">
        <CalendarIcon className="h-[18px] w-[18px]" /> Create Meeting
      </Button>
    </div>
  );
}
