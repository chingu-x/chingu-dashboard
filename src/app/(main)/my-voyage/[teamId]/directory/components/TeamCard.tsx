import EditCell from "./EditCell";
import type { TeamMember } from "./fixtures/MyTeam";

interface TeamCardProps {
  teamMember: TeamMember;
}

export default function TeamCard({ teamMember }: TeamCardProps) {
  return (
    <div className="box-border flex flex-col items-center p-10 bg-secondary-content rounded-2xl">
      <ul className="flex flex-col gap-6 min-w-[400px]">
        <li className="grid items-center grid-cols-2 gap-6">
          <span className="font-semibold">Name</span>
          <span>{teamMember.name}</span>
        </li>
        <li className="grid items-center grid-cols-2 gap-6">
          <span className="font-semibold">Discord ID</span>
          <span>{teamMember.discordId}</span>
        </li>
        <li className="grid items-center grid-cols-2 gap-6">
          <span className="font-semibold">Average Hour/Sprint</span>
          <EditCell teamMember={teamMember} />
        </li>
        <li className="grid items-center grid-cols-2 gap-6">
          <span className="font-semibold">Timezone</span>
          <span>{teamMember.timeZone}</span>
        </li>
        <li className="grid items-center grid-cols-2 gap-6">
          <span className="font-semibold">Position</span>
          <span>{teamMember.position}</span>
        </li>
      </ul>
    </div>
  );
}
