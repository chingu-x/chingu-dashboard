import EditCell from "./EditCell";
import type { TeamMember } from "./fixtures/MyTeam";
import { getTimezone } from "@/helpers/getTimezone";

interface TeamRowProps {
  teamMember: TeamMember;
  currentUser: {
    id: string;
    teamId: number;
  };
}

export default function TeamRow({ teamMember, currentUser }: TeamRowProps) {
  return (
    <tr>
      <td>{`${teamMember.member.firstName} ${teamMember.member.lastName}`}</td>
      <td>{teamMember.member.discordId}</td>
      <td>
        <EditCell teamMember={teamMember} currentUser={currentUser} />
      </td>
      <td>{getTimezone(teamMember.member.timezone)}</td>
      <td>{teamMember.voyageRole.name}</td>
    </tr>
  );
}
