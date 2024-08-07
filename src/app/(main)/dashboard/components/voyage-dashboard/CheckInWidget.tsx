"use client";

import { ArrowRightIcon, DocumentCheckIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import React from "react";
import Link from "next/link";
import { getDay } from "date-fns";
import Button from "@/components/Button";
import Badge from "@/components/badge/Badge";
import routePaths from "@/utils/routePaths";
import { getSprintCheckinIsStatus } from "@/utils/getFormStatus";
import type { User } from "@/store/features/user/userSlice";
import { useUser } from "@/store/hooks";

interface CheckInWidgetProps {
  user: User | null;
  currentSprintNumber: number | null;
  teamId: string;
}
function CheckInWidget({
  user,
  currentSprintNumber,
  teamId,
}: CheckInWidgetProps) {
  const { currentDate } = useUser();
  const userDate = currentDate ?? new Date();

  const sprintCheckinIsSubmitted = getSprintCheckinIsStatus(
    user,
    Number(currentSprintNumber),
  );

  function renderWeeklyCheckinButton() {
    if (sprintCheckinIsSubmitted) {
      return (
        <Button variant="primary" size="lg" className="group" disabled={true}>
          <CheckCircleIcon className="h-[18px] w-[18px]" />
          Check-in Submitted
        </Button>
      );
    } else {
      return (
        <Button
          variant="primary"
          size="lg"
          className="group self-center"
          disabled={false}
        >
          <DocumentCheckIcon className="h-[18px] w-[18px]" />
          Submit Check-in
          <ArrowRightIcon className="h-[18px] w-0 transition-all group-hover:w-[18px]" />
        </Button>
      );
    }
  }

  const getBadgeValue = (userDate: Date): string => {
    const dayOfWeek = getDay(userDate);

    if (dayOfWeek >= 2 && dayOfWeek <= 6) {
      return "";
    } else if (dayOfWeek === 0) {
      return "Pending Submission";
    } else if (dayOfWeek === 1) {
      return "Due today";
    }

    return "";
  };

  const badgeValue = getBadgeValue(userDate);

  return (
    <div className="flex flex-col rounded-2xl border-2 border-base-100 bg-base-200 p-6">
      <div className="flex flex-row justify-between pb-[9px]">
        <p className="text-xl font-semibold">Weekly Check-in</p>
        {badgeValue ? (
          <Badge
            title={badgeValue}
            variant={badgeValue === "Due today" ? "error" : "warning"}
          />
        ) : null}
      </div>
      <p className="pb-6 text-base font-medium">
        How did that last sprint with your team go?
      </p>
      <Link
        href={routePaths.weeklyCheckInPage(
          teamId,
          currentSprintNumber?.toString() ?? "",
        )}
        className="self-center"
      >
        {renderWeeklyCheckinButton()}
      </Link>
    </div>
  );
}

export default CheckInWidget;
