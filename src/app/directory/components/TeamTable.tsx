import styles from "./TeamRow.module.css";
import TeamRow from "./TeamRow";
import { teamMembers } from "./fixtures/MyTeam";

// Temp:
const currentUserId = "1";

export default function TeamTable() {
  return (
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
            <th>Location</th>
            <th>Time Zone</th>
            <th>Email</th>
            <th>Position</th>
          </tr>
        </thead>
        <tbody className="text-base font-medium text-base-300">
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
