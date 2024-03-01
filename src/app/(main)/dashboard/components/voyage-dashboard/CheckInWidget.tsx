import { DocumentCheckIcon } from "@heroicons/react/24/outline";
import React from "react";
import Button from "@/components/Button";
import Badge from "@/components/badge/Badge";

interface CheckInWidgetProps {
  status: string;
}
function CheckInWidget({ status }: CheckInWidgetProps) {
  return (
    <div className="bg-base-200 rounded-2xl flex flex-col p-6">
      <div className="flex flex-row pb-[9px] justify-between">
        <p className="text-xl font-semibold">Weekly Check-in</p>
        <Badge title={status} variant="warning" />
      </div>
      <p className="pb-6 font-medium text-base">
        How did that last sprint with your team go?
      </p>
      <Button className="w-max-[200px] self-center text-base font-semibold">
        <DocumentCheckIcon width={14} />
        Submit Check-in
      </Button>
    </div>
  );
}

export default CheckInWidget;
