import TeamCard from "./TeamCard";
import { teamMembers } from "./fixtures/MyTeam";

// Temp:
const currentUserId = "1";

export default function TeamCardsContainer() {
  return (
    <div className="flex flex-col min-[1920px]:hidden gap-y-10 w-full text-base-300 text-medium">
      {/* cards */}
      {teamMembers.map((teamMember) => (
        <TeamCard
          key={teamMember.id}
          teamMember={teamMember}
          currentUserId={currentUserId}
        />
      ))}
    </div>
  );
}
