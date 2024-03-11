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

export default function SprintActions() {
  return (
    <div className="flex justify-between p-5 border shadow-md bg-base-200 rounded-2xl border-base-100">
      {/* TODO: add animated variant to Button.tsx ??? */}
      {/* TODO: fix rounting later */}
      <Link href={routePaths.submitVoyage("2")}>
        <Button variant="secondary" size="lg" className="group">
          <RocketLaunchIcon className="h-[18px] w-[18px]" /> Submit Voyage
          <ArrowRightIcon className="h-[18px] w-0 group-hover:w-[18px] transition-all" />
        </Button>
      </Link>
      <Link href={routePaths.weeklyCheckIn("2")}>
        <Button variant="primary" size="lg" className="group">
          <DocumentCheckIcon className="h-[18px] w-[18px]" /> Submit Check-in
          <ArrowRightIcon className="h-[18px] w-0 group-hover:w-[18px] transition-all" />
        </Button>
      </Link>
      <Link href={routePaths.createMeeting("2")}>
        <Button variant="outline" size="lg" className="group">
          <CalendarIcon className="h-[18px] w-[18px]" /> Create Meeting
          <PlusIcon className="h-[18px] w-0 group-hover:w-[18px] transition-all" />
        </Button>
      </Link>
    </div>
  );
}
