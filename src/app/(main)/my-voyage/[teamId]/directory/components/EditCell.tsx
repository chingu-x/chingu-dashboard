import { PencilSquareIcon } from "@heroicons/react/24/solid";
import type { TeamMember } from "./fixtures/MyTeam";
import { cn } from "@/lib/utils";

interface EditCellProps {
  teamMember: TeamMember;
}

export default function EditCell({ teamMember }: EditCellProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between h-[35px] max-w-[198px] rounded-md pl-4",
        // teamMember.id === currentUserId &&
        //   "bg-base-100 hover:cursor-pointer hover:bg-secondary transition"
      )}
    >
      {teamMember.averageHour === 0 ? "Add hours" : teamMember.averageHour}
      {/* {teamMember.id === currentUserId && (
        <button
          type="button"
          title="edit"
          className="h-full min-h-0 p-0 pl-2 pr-[10px] text-sm font-medium bg-transparent border-transparent rounded-l-none rounded-r-md text-base-300 hover:bg-transparent hover:border-transparent"
        >
          <PencilSquareIcon className="w-4 h-4 text-base-300" />
        </button>
      )} */}
    </div>
  );
}
