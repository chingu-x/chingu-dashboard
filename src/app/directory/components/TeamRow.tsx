import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { TeamMember } from "./fixtures/MyTeam";
import { Button } from "@/components";

interface TeamRowProps {
  teamMember: TeamMember;
  currentUserId: string;
}

function TeamRow({ teamMember, currentUserId }: TeamRowProps) {
  return (
    <tr>
      <td className="text-black">{teamMember.name}</td>
      <td>{teamMember.discordId}</td>
      <td>
        <div className="flex items-center justify-between h-[35px] bg-white rounded-md pl-4">
          {teamMember.averageHour === 0 ? "Add hours" : teamMember.averageHour}
          {teamMember.id === currentUserId && (
            <Button
              title={"edit"}
              customClassName="pl-2 pr-1 h-full rounded-l-none rounded-r-md p-0 min-h-0 text-sm font-semibold text-black bg-white border-transparent hover:bg-white hover:border-transparent"
            >
              <PencilSquareIcon className="w-4 h-4 text-black" />
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
