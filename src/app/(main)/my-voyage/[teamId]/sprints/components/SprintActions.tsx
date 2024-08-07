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

interface SprintActionsProps {
  params: {
    teamId: string;
    meetingId?: string;
    sprintNumber: string;
  };
  sprintCheckinIsSubmitted: boolean;
  voyageProjectIsSubmitted: boolean;
  currentSprintNumber: number;
}

export default function SprintActions({
  params,
  sprintCheckinIsSubmitted,
  voyageProjectIsSubmitted,
  currentSprintNumber,
}: SprintActionsProps) {
  const [teamId, meetingId, sprintNumber] = [
    params.teamId,
    params.meetingId,
    params.sprintNumber,
  ];

  const isCurrentSprint = sprintNumber === currentSprintNumber.toString();
  const submitVoyageIsAllowed = sprintNumber === "5" || sprintNumber === "6";

  function renderWeeklyCheckinButton() {
    if (sprintCheckinIsSubmitted) {
      return (
        <Button variant="primary" size="lg" className="group" disabled={true}>
          <CheckCircleIcon className="h-[18px] w-[18px]" />
          Check-in Submitted
        </Button>
      );
    } else {
      if (isCurrentSprint) {
        return (
          <Button
            variant="primary"
            size="lg"
            className="group"
            disabled={false}
          >
            <DocumentCheckIcon className="h-[18px] w-[18px]" />
            Submit Check-in
            <ArrowRightIcon className="h-[18px] w-0 transition-all group-hover:w-[18px]" />
          </Button>
        );
      } else {
        return (
          <Button variant="primary" size="lg" className="group" disabled={true}>
            <DocumentCheckIcon className="h-[18px] w-[18px]" />
            Submit Check-in
          </Button>
        );
      }
    }
  }

  function renderSubmitVoyageButton() {
    if (submitVoyageIsAllowed) {
      if (voyageProjectIsSubmitted) {
        return (
          <Button
            variant="secondary"
            size="lg"
            className="group"
            disabled={true}
          >
            <SolidRocketLaunchIcon className="h-[18px] w-[18px]" />
            Voyage Submitted
          </Button>
        );
      } else {
        return (
          <Button
            variant="secondary"
            size="lg"
            className="group"
            disabled={false}
          >
            <RocketLaunchIcon className="h-[18px] w-[18px]" />
            Submit Voyage
            <ArrowRightIcon className="h-[18px] w-0 transition-all group-hover:w-[18px]" />
          </Button>
        );
      }
    } else {
      return (
        <Button variant="secondary" size="lg" className="group" disabled={true}>
          <SolidRocketLaunchIcon className="h-[18px] w-[18px]" />
          {voyageProjectIsSubmitted ? "Voyage Submitted" : "Submit Voyage"}
        </Button>
      );
    }
  }

  return (
    <div className="flex justify-between rounded-2xl border border-base-100 bg-base-200 p-5 shadow-md">
      <Link href={routePaths.submitVoyagePage(teamId, sprintNumber)}>
        {renderSubmitVoyageButton()}
      </Link>
      <Link href={routePaths.weeklyCheckInPage(teamId, sprintNumber)}>
        {renderWeeklyCheckinButton()}
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
            <PlusIcon className="h-[18px] w-0 transition-all group-hover:w-[18px]" />
          )}
        </Button>
      </Link>
    </div>
  );
}
