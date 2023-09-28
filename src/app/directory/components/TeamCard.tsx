import { EditCell, TeamMember } from ".";

interface TeamCardProps {
  teamMember: TeamMember;
  currentUserId: string;
}

export default function TeamCard({ teamMember, currentUserId }: TeamCardProps) {
  return (
    <div className="box-border flex flex-col items-center p-10 card bg-secondary-content">
      <ul className="flex flex-col gap-6 min-w-[400px]">
        <li className="grid grid-cols-2 gap-6">
          <span className="font-semibold">Name</span>
          <span>{teamMember.name}</span>
        </li>
        <li className="grid grid-cols-2 gap-6">
          <span className="font-semibold">Discord ID</span>
          <span>{teamMember.discordId}</span>
        </li>
        <li className="grid grid-cols-2 gap-6">
          <span className="font-semibold">Average Hour/Sprint</span>
          <EditCell teamMember={teamMember} currentUserId={currentUserId} />
        </li>
        <li className="grid grid-cols-2 gap-6">
          <span className="font-semibold">Location</span>
          <span>{teamMember.location}</span>
        </li>
        <li className="grid grid-cols-2 gap-6">
          <span className="font-semibold">Timezone</span>
          <span>{teamMember.timeZone}</span>
        </li>
        <li className="grid grid-cols-2 gap-6">
          <span className="font-semibold">Email</span>
          <span>{teamMember.email}</span>
        </li>
        <li className="grid grid-cols-2 gap-6">
          <span className="font-semibold">Position</span>
          <span>{teamMember.position}</span>
        </li>
      </ul>
    </div>
  );
}
