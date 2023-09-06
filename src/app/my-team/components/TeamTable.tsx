import { teamMembers } from "./fixtures/MyTeam";
import { TeamRow } from ".";

function TeamTable() {
  return (
    <div className="mx-8 overflow-x-auto">
      <table className="table px-6 border-separate border-none bg-primary-content py-7">
        {/* head */}
        <thead className="mb-10 text-xl font-semibold text-black">
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
        <tbody className="text-base font-medium text-neutral">
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
