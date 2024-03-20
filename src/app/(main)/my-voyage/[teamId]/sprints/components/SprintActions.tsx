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
  meetingId: string;
  sprintNumber: string;
}

export default function SprintActions({
  meetingId,
  sprintNumber,
}: SprintActionsProps) {
  const submitVoyageIsAllowed = sprintNumber === "5" || sprintNumber === "6";
  return (
    <div className="flex justify-between p-5 border shadow-md bg-base-200 rounded-2xl border-base-100">
      {/* TODO: add animated variant to Button.tsx ??? */}
      <Link href={routePaths.submitVoyage(meetingId)}>
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
      <Link href={routePaths.weeklyCheckIn(meetingId)}>
        <Button variant="primary" size="lg" className="group">
          <DocumentCheckIcon className="h-[18px] w-[18px]" /> Submit Check-in
          <ArrowRightIcon className="h-[18px] w-0 group-hover:w-[18px] transition-all" />
        </Button>
      </Link>
      <Link
        href={
          !meetingId
            ? routePaths.createMeeting(meetingId, sprintNumber)
            : routePaths.editMeeting(meetingId, sprintNumber, meetingId)
        }
      >
        <Button variant="outline" size="lg" className="group">
          <CalendarIcon className="h-[18px] w-[18px]" />{" "}
          {!meetingId ? "Create Meeting" : "Edit Meeting"}
          {!meetingId && (
            <PlusIcon className="h-[18px] w-0 group-hover:w-[18px] transition-all" />
          )}
        </Button>
      </Link>
    </div>
  );
}
