import Link from "next/link";
import {
  ClipboardDocumentListIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@chingu-x/components/button";
import routePaths from "@/utils/routePaths";

interface AgendaHeaderProps {
  teamId: number;
  meetingId: number;
  sprintNumber: number;
}

export default function AgendaHeader({
  teamId,
  sprintNumber,
  meetingId,
}: AgendaHeaderProps) {
  return (
    <div className="mb-5 flex w-full justify-between">
      <h3 className="flex items-center gap-x-2 text-[25px] font-semibold">
        <ClipboardDocumentListIcon className="h-[30px] w-[30px]" />
        Agenda
      </h3>
      <Link
        href={routePaths.addTopicPage(
          teamId.toString(),
          sprintNumber.toString(),
          meetingId.toString(),
        )}
      >
        <Button className="w-[230px] justify-between gap-x-[60px]" size="lg">
          Add topic <PlusIcon className="h-[20px] w-[20px]" />
        </Button>
      </Link>
    </div>
  );
}
