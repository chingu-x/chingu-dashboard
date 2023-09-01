import { teamMembers } from "./fixtures/MyTeam";
import { TeamRow } from ".";

function TeamTable() {
  return (
    <div className="overflow-x-auto">
      <table className="table bg-[#C4DED2] px-6 py-7 border-separate border-none">
        {/* head */}
        <thead className="text-xl font-semibold text-[#000000] mb-10">
          <tr>
            <th>Name</th>
            <th>Discord ID</th>
            <th>Average Hour/Sprint</th>
            <th>Location</th>
            <th>Time Zone</th>
            <th>Email</th>
            <th>Position</th>
          </tr>
        </thead>
        <tbody className="text-base font-medium text-[#757575]">
          {/* rows */}
          {teamMembers.map((teamMemeber) => (
            <TeamRow key={teamMemeber.id} teamMemeber={teamMemeber} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TeamTable;
