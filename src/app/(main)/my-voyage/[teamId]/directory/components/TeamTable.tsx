import TeamRow from "./TeamRow";
// import { teamMembers } from "./fixtures/MyTeam";
import { TeamDirectory } from "@/store/features/directory/directorySlice";

interface TeamTableProps {
  teamDirectory: TeamDirectory;
}

export default function TeamTable({ teamDirectory }: TeamTableProps) {
  const { voyageTeamMembers } = teamDirectory;

  return (
    <div className="hidden w-full min-[1920px]:block">
      <table className="w-full p-10 border-separate border-none rounded-2xl bg-secondary-content text-base-300">
        {/* head */}
        <thead className="mb-6 text-xl font-semibold text-base-300">
          <tr className="[&>*]:pb-5 [&>*]:text-left">
            <th>Name</th>
            <th>Discord ID</th>
            <th>Average Hour/Sprint</th>
            <th>Time Zone</th>
            <th>Position</th>
          </tr>
        </thead>
        <tbody className="text-base font-medium text-base-300">
          {/* rows */}
          {voyageTeamMembers.map((teamMember) => (
            <TeamRow key={teamMember.id} teamMember={teamMember} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
