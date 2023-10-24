import styles from "./TeamRow.module.css";

import TeamRow from "./TeamRow";
import TeamCard from "./TeamCard";

import { TeamMember } from "./fixtures/MyTeam";

interface TeamDirectoryProps {
  members: TeamMember[];
  currentUser: {
    id: string;
    teamId: number;
  };
}

export default function TeamDirectory({
  members,
  currentUser,
}: TeamDirectoryProps) {
  return (
    <>
      {/* For screens > 1920px */}
      <div className="hidden w-full min-[1920px]:block">
        <table
          className={`table px-6 pb-10 border-separate border-none bg-secondary-content text-base-300 pt-7 ${styles["table"]}`}
        >
          {/* head */}
          <thead className="mb-10 text-xl font-semibold text-base-300">
            <tr>
              <th>Name</th>
              <th>Discord ID</th>
              <th>Average Hour/Sprint</th>
              <th>Time Zone</th>
              <th>Position</th>
            </tr>
          </thead>
          <tbody className="text-base font-medium text-base-300">
            {/* rows */}
            {members.map((member) => (
              <TeamRow
                key={`${member.member.lastName} + ${member.voyageRole.name}`}
                teamMember={member}
                currentUser={currentUser}
              />
            ))}
          </tbody>
        </table>
      </div>
      {/* For screens < 1920px */}
      <div className="flex flex-col min-[1920px]:hidden gap-y-10 w-full text-base-300 text-medium">
        {/* cards */}
        {members.map((member) => (
          <TeamCard
            key={`${member.member.lastName} + ${member.voyageRole.name}`}
            teamMember={member}
            currentUser={currentUser}
          />
        ))}
      </div>
    </>
  );
}
