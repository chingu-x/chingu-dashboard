import EditCell from "./EditCell";
import type { TeamMember } from "./fixtures/MyTeam";

interface TeamRowProps {
  teamMember: TeamMember;
  currentUserId: string;
}

export default function TeamRow({ teamMember, currentUserId }) {
  return (
    <tr>
      <td>{teamMember.name}</td>
      <td>{teamMember.discordId}</td>
      <td>
        <EditCell teamMember={teamMember} currentUserId={currentUserId} />
      </td>
      <td>{teamMember.location}</td>
      <td>{teamMember.timeZone}</td>
      <td>{teamMember.email}</td>
      <td>{teamMember.position}</td>
    </tr>
  );
}
