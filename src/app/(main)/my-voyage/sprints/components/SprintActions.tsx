import Link from "next/link";
import {
  CalendarIcon,
  DocumentCheckIcon,
  RocketLaunchIcon,
  ArrowRightIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

import Button from "@/components/Button";

export default function SprintActions() {
  return (
    <div className="flex justify-between p-5 shadow-md bg-base-200 rounded-2xl">
      {/* TODO: add animated variant to Button.tsx ??? */}
      <Link href="/my-voyage/sprints/voyage-submission">
        <Button variant="secondary" size="lg" className="group">
          <RocketLaunchIcon className="h-[18px] w-[18px]" /> Submit Voyage
          <ArrowRightIcon className="h-[18px] w-0 group-hover:w-[18px] transition-all" />
        </Button>
      </Link>
      <Link href="/my-voyage/sprints/weekly-checkin">
        <Button variant="primary" size="lg" className="group">
          <DocumentCheckIcon className="h-[18px] w-[18px]" /> Submit Check-in
          <ArrowRightIcon className="h-[18px] w-0 group-hover:w-[18px] transition-all" />
        </Button>
      </Link>
      <Link href="/my-voyage/sprints/create-meeting">
        <Button variant="outline" size="lg" className="group">
          <CalendarIcon className="h-[18px] w-[18px]" /> Create Meeting
          <PlusIcon className="h-[18px] w-0 group-hover:w-[18px] transition-all" />
        </Button>
      </Link>
    </div>
  );
}
