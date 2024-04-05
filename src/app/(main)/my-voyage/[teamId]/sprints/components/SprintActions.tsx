import Link from "next/link";
import {
  CalendarIcon,
  DocumentCheckIcon,
  RocketLaunchIcon,
  ArrowRightIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

import Button from "@/components/Button";
import routePaths from "@/utils/routePaths";

interface SprintActionsProps {
  teamId: string;
  meetingId?: string;
  sprintNumber: string;
}

export default function SprintActions({
  teamId,
  meetingId,
  sprintNumber,
}: SprintActionsProps) {
  const submitVoyageIsAllowed = sprintNumber === "5" || sprintNumber === "6";
  return (
    <div className="flex justify-between p-5 border border-base-100 shadow-md bg-base-200 rounded-2xl">
      {/* TODO: add animated variant to Button.tsx ??? */}
      <Link href={meetingId ? routePaths.submitVoyagePage(meetingId) : "/"}>
        <Button
          variant="secondary"
          size="lg"
          className="group"
          disabled={!submitVoyageIsAllowed}
        >
          <RocketLaunchIcon className="h-[18px] w-[18px]" /> Submit Voyage
          {submitVoyageIsAllowed && (
            <ArrowRightIcon className="h-[18px] w-0 group-hover:w-[18px] transition-all" />
          )}
        </Button>
      </Link>
      <Link href={meetingId ? routePaths.weeklyCheckInPage(meetingId) : ""}>
        <Button variant="primary" size="lg" className="group">
          <DocumentCheckIcon className="h-[18px] w-[18px]" /> Submit Check-in
          <ArrowRightIcon className="h-[18px] w-0 group-hover:w-[18px] transition-all" />
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
          <CalendarIcon className="h-[18px] w-[18px]" />{" "}
          {meetingId ? "Edit Meeting" : "Create Meeting"}
          {meetingId ? null : (
            <PlusIcon className="h-[18px] w-0 group-hover:w-[18px] transition-all" />
          )}
        </Button>
      </Link>
    </div>
  );
}
