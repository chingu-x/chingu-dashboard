import { PencilSquareIcon } from "@heroicons/react/24/solid";
import type { TeamMember } from "./fixtures/MyTeam";
import Button from "@/components/Button";

interface EditCellProps {
  teamMember: TeamMember;
  currentUserId: string;
}

export default function EditCell({ teamMember, currentUserId }: EditCellProps) {
  return (
    <div
      className={`flex items-center justify-between h-[35px] rounded-md pl-4 ${
        teamMember.id === currentUserId &&
        "bg-base-100 hover:cursor-pointer hover:bg-secondary transition"
      }`}
    >
      {teamMember.averageHour === 0 ? "Add hours" : teamMember.averageHour}
      {teamMember.id === currentUserId && (
        <Button
          title="edit"
          customClassName="pl-2 pr-1 h-full rounded-l-none rounded-r-md p-0 min-h-0 text-sm font-medium text-base-300 bg-transparent border-transparent hover:bg-transparent hover:border-transparent"
        >
          <PencilSquareIcon className="w-4 h-4 text-base-300" />
        </Button>
      )}
    </div>
  );
}
