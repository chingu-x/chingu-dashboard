// import EditCell from "./EditCell";
// import type { TeamMember } from "./fixtures/MyTeam";

import EditHours from "./EditHours";
import { VoyageTeam } from "@/store/features/directory/directorySlice";

interface TeamCardProps {
  teamMember: VoyageTeam;
}

export default function TeamCard({ teamMember }: TeamCardProps) {
  const { firstName, lastName, discordId, currentTime } = teamMember.member;
  const { voyageRole, hrPerSprint } = teamMember;

  return (
    <div className="box-border flex flex-col items-center p-10 bg-secondary-content rounded-2xl">
      <ul className="flex flex-col gap-6 min-w-[400px]">
        <li className="grid items-center grid-cols-2 gap-6">
          <span className="font-semibold">Name</span>
          <span>{firstName + " " + lastName}</span>
        </li>
        <li className="grid items-center grid-cols-2 gap-6">
          <span className="font-semibold">Discord ID</span>
          <span>{discordId}</span>
        </li>
        <li className="grid items-center grid-cols-2 gap-6">
          <span className="font-semibold">Average Hour/Sprint</span>
          {/* <EditCell teamMember={teamMember} /> */}
          <EditHours />
          {hrPerSprint}
        </li>
        <li className="grid items-center grid-cols-2 gap-6">
          <span className="font-semibold">Timezone</span>
          <span>{currentTime}</span>
        </li>
        <li className="grid items-center grid-cols-2 gap-6">
          <span className="font-semibold">Position</span>
          <span>{voyageRole.name}</span>
        </li>
      </ul>
    </div>
  );
}
