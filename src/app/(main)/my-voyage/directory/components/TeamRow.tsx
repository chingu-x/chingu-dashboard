import EditCell from "./EditCell";
import type { TeamMember } from "./fixtures/MyTeam";

interface TeamRowProps {
  teamMember: TeamMember;
  currentUserId: string;
}

export default function TeamRow({ teamMember, currentUserId }: TeamRowProps) {
  return (
    <tr className="[&>*]:py-1">
      <td>{teamMember.name}</td>
      <td>{teamMember.discordId}</td>
      <td>
        <EditCell teamMember={teamMember} currentUserId={currentUserId} />
      </td>
      <td>{teamMember.timeZone}</td>
      <td>{teamMember.position}</td>
    </tr>
  );
}
