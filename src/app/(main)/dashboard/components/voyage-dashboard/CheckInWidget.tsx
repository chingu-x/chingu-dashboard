"use client";

import { ArrowRightIcon, DocumentCheckIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import React from "react";
import Link from "next/link";
import { isSameDay, sub } from "date-fns";
import { type User } from "@chingu-x/modules/user";
import { Badge } from "@chingu-x/components/badge";
import Button from "@/components/Button";
import routePaths from "@/utils/routePaths";
import { getSprintCheckinIsStatus } from "@/utils/getFormStatus";
import { useSprint, useUser } from "@/store/hooks";
import convertStringToDate from "@/utils/convertStringToDate";

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
  const { timezone, currentDateInUserTimezone } = useUser();
  const sprintsData = useSprint();
  const userDate = currentDateInUserTimezone ?? new Date();

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
    const currentSprintEndDate = sprintsData.voyage.sprints.find(
      (sprint) => sprint.number === currentSprintNumber,
    )?.endDate;

    if (currentSprintEndDate) {
      const currentSprintEndDateInUserTimezone = convertStringToDate(
        currentSprintEndDate,
        timezone,
      );

      if (isSameDay(userDate, currentSprintEndDateInUserTimezone)) {
        return "Due today";
      } else if (
        isSameDay(
          userDate,
          sub(currentSprintEndDateInUserTimezone, { days: 1 }),
        )
      ) {
        return "Pending Submission";
      }
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
