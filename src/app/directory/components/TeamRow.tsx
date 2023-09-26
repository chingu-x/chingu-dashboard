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
        <div className="flex items-center justify-between h-[35px] bg-base-100 hover:bg-secondary hover:cursor-pointer rounded-md pl-4">
          {teamMember.averageHour === 0 ? "Add hours" : teamMember.averageHour}
          {teamMember.id === currentUserId && (
            <div
              className="flex items-center justify-between pr-4 text-sm font-semibold "
            >
              <PencilSquareIcon className="w-4 h-4 text-base-300 bg-transparent" />
            </div>
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
