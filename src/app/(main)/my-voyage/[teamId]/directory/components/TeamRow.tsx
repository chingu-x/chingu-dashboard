// import EditCell from "./EditCell";
// import type { TeamMember } from "./fixtures/MyTeam";
import { VoyageTeam } from "@/store/features/directory/directorySlice";

interface TeamRowProps {
  teamMember: VoyageTeam;
}

export default function TeamRow({ teamMember }: TeamRowProps) {
  const { firstName, lastName, discordId, currentTime } = teamMember.member;
  const { voyageRole, hrPerSprint } = teamMember;

  return (
    <tr className="[&>*]:py-1">
      <td>{firstName + " " + lastName}</td>
      <td>{discordId}</td>
      <td>{hrPerSprint}</td>
      {/* <td><EditCell teamMember={teamMember} /></td> */}
      <td>{currentTime}</td>
      <td>{voyageRole.name}</td>
    </tr>
  );
}
