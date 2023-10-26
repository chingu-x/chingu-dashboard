import { getTimezone } from "@/helpers/getTimezone";
import EditCell from "./EditCell";
import type { TeamMember } from "./fixtures/MyTeam";

interface TeamCardProps {
  teamMember: TeamMember;
  currentUser: {
    id: string;
    teamId: number;
  };
}

export default function TeamCard({ teamMember, currentUser }: TeamCardProps) {
  return (
    <div className="box-border flex flex-col items-center p-10 card bg-secondary-content">
      <ul className="flex flex-col gap-6 min-w-[400px]">
        <li className="grid grid-cols-2 gap-6">
          <span className="font-semibold">Name</span>
          <span>{`${teamMember.member.firstName} ${teamMember.member.lastName}`}</span>
        </li>
        <li className="grid grid-cols-2 gap-6">
          <span className="font-semibold">Discord ID</span>
          <span>{teamMember.member.discordId}</span>
        </li>
        <li className="grid grid-cols-2 gap-6">
          <span className="font-semibold">Average Hour/Sprint</span>
          <EditCell teamMember={teamMember} currentUser={currentUser} />
        </li>
        <li className="grid grid-cols-2 gap-6">
          <span className="font-semibold">Time Zone</span>
          <span>{getTimezone(teamMember.member.timezone)}</span>
        </li>
        <li className="grid grid-cols-2 gap-6">
          <span className="font-semibold">Position</span>
          <span>{teamMember.voyageRole.name}</span>
        </li>
      </ul>
    </div>
  );
}
