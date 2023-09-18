import styles from "./TeamRow.module.css";
import { TeamRow, teamMembers } from ".";

// Temp:
const currentUserId = "1";

function TeamTable() {
  return (
    <div className="overflow-x-auto">
      <table
        className={`table px-6 pb-10 border-separate border-none bg-primary-content pt-7 ${styles["table"]}`}
      >
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
          {teamMembers.map((teamMember) => (
            <TeamRow
              key={teamMember.id}
              teamMember={teamMember}
              currentUserId={currentUserId}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TeamTable;
