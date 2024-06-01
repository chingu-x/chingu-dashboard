import Link from "next/link";
import {
  CalendarIcon,
  DocumentCheckIcon,
  RocketLaunchIcon,
  ArrowRightIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import {
  CheckCircleIcon,
  RocketLaunchIcon as SolidRocketLaunchIcon,
} from "@heroicons/react/24/solid";

import Button from "@/components/Button";
import routePaths from "@/utils/routePaths";
import { cn } from "@/lib/utils";

interface SprintActionsProps {
  params: {
    teamId: string;
    meetingId?: string;
    sprintNumber: string;
  };
  sprintCheckinIsSubmitted: boolean;
}

export default function SprintActions({
  params,
  sprintCheckinIsSubmitted,
}: SprintActionsProps) {
  const [teamId, meetingId, sprintNumber] = [
    params.teamId,
    params.meetingId,
    params.sprintNumber,
  ];
  const submitCheckinIsAllowed = !sprintCheckinIsSubmitted;
  const submitVoyageIsAllowed = sprintNumber === "5" || sprintNumber === "6";
  return (
    <div className="flex justify-between p-5 border shadow-md border-base-100 bg-base-200 rounded-2xl">
      {/* TODO: add animated variant to Button.tsx ??? */}
      <Link
        href={
          meetingId
            ? routePaths.submitVoyagePage(teamId, sprintNumber, meetingId)
            : routePaths.dashboardPage()
        }
      >
        <Button
          variant="secondary"
          size="lg"
          className="group"
          disabled={!submitVoyageIsAllowed}
        >
          {submitVoyageIsAllowed ? (
            <RocketLaunchIcon className="h-[18px] w-[18px]" />
          ) : (
            <SolidRocketLaunchIcon className="h-[18px] w-[18px]" />
          )}
          {submitVoyageIsAllowed ? "Submit Voyage" : "Voyage Submitted"}
          <ArrowRightIcon
            className={cn(
              "h-[18px] w-0 group-disabled:group-hover:w-0 group-hover:w-[18px] transition-all",
              !submitVoyageIsAllowed && "w-0"
            )}
          />
        </Button>
      </Link>
      <Link
        href={
          meetingId
            ? routePaths.weeklyCheckInPage(teamId, sprintNumber, meetingId)
            : routePaths.dashboardPage()
        }
      >
        <Button
          variant="primary"
          size="lg"
          className="group"
          disabled={!submitCheckinIsAllowed}
        >
          {submitCheckinIsAllowed ? (
            <DocumentCheckIcon className="h-[18px] w-[18px]" />
          ) : (
            <CheckCircleIcon className="h-[18px] w-[18px]" />
          )}
          {submitCheckinIsAllowed ? "Submit Check-in" : "Check-in Submitted"}
          <ArrowRightIcon className="h-[18px] w-0 group-disabled:group-hover:w-0 group-hover:w-[18px] transition-all" />
        </Button>
      </Link>
      <Link
        href={
          meetingId
            ? routePaths.editMeetingPage(teamId, sprintNumber, meetingId)
            : routePaths.createMeetingPage(teamId, sprintNumber)
        }
      >
        <Button variant="outline" size="lg" className="group">
          <CalendarIcon className="h-[18px] w-[18px]" />
          {meetingId ? "Edit Meeting" : "Create Meeting"}
          {meetingId ? null : (
            <PlusIcon className="h-[18px] w-0 group-hover:w-[18px] transition-all" />
          )}
        </Button>
      </Link>
    </div>
  );
}
