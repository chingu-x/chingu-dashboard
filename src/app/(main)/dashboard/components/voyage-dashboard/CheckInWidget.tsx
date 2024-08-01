"use client";

import { DocumentCheckIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import Button from "@/components/Button";
import Badge from "@/components/badge/Badge";

interface CheckInWidgetProps {
  status: string;
}
function CheckInWidget({ status }: CheckInWidgetProps) {
  const [checkInSubmitted, setCheckInSubmitted] = useState<boolean>(false);

  return (
    <div className="flex flex-col rounded-2xl border-2 border-base-100 bg-base-200 p-6">
      <div className="flex flex-row justify-between pb-[9px]">
        <p className="text-xl font-semibold">Weekly Check-in</p>
        <Badge
          title={status}
          variant={status === "Due today" ? "error" : "warning"}
        />
      </div>
      <p className="pb-6 text-base font-medium">
        How did that last sprint with your team go?
      </p>
      <Button
        className="max-w-[200px] self-center text-base font-semibold"
        disabled={checkInSubmitted}
        onClick={() => setCheckInSubmitted(true)}
      >
        {checkInSubmitted ? (
          <CheckCircleIcon width={15} className="text-black" />
        ) : (
          <DocumentCheckIcon width={15} />
        )}
        Submit Check-in
      </Button>
    </div>
  );
}

export default CheckInWidget;
