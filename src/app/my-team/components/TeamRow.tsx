import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { TeamMember } from "./fixtures/MyTeam";
import { Button } from "@/components";

// Temp:
const currentUserId = "1";

interface TeamRowProps {
  teamMemeber: TeamMember;
}

function TeamRow({ teamMemeber }: TeamRowProps) {
  return (
    <tr>
      <td className="text-black">{teamMemeber.name}</td>
      <td>{teamMemeber.discordId}</td>
      <td>
        <div className="flex items-center justify-between">
          {teamMemeber.averageHour}
          {teamMemeber.id === currentUserId && (
            <Button
              title={"edit"}
              customClassName="gap-x-0 px-2 h-8 p-0 min-h-full text-sm font-semibold text-black bg-white border-transparent"
            >
              <PencilSquareIcon className="w-4 h-4 text-black" />
            </Button>
          )}
        </div>
      </td>
      <td>{teamMemeber.location}</td>
      <td>{teamMemeber.timeZone}</td>
      <td>{teamMemeber.email}</td>
      <td>{teamMemeber.position}</td>
    </tr>
  );
}

export default TeamRow;
