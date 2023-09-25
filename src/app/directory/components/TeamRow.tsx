import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { TeamMember } from ".";
import { Button } from "@/components";

interface TeamRowProps {
  teamMember: TeamMember;
  currentUserId: string;
}

function TeamRow({ teamMember, currentUserId }: TeamRowProps) {
  return (
    <tr>
      <td>{teamMember.name}</td>
      <td>{teamMember.discordId}</td>
      <td>
        <div
          className={`flex items-center justify-between h-[35px] rounded-md pl-4 ${
            teamMember.id === currentUserId &&
            "bg-base-100 hover:bg-secondary transition"
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
      </td>
      <td>{teamMember.location}</td>
      <td>{teamMember.timeZone}</td>
      <td>{teamMember.email}</td>
      <td>{teamMember.position}</td>
    </tr>
  );
}

export default TeamRow;
