import TeamCard from "./TeamCard";
// import { teamMembers } from "./fixtures/MyTeam";
import { TeamDirectory } from "@/store/features/directory/directorySlice";

interface TeamCardsContainerProps {
  teamDirectory: TeamDirectory;
}

export default function TeamCardsContainer({
  teamDirectory,
}: TeamCardsContainerProps) {
  const { voyageTeamMembers } = teamDirectory;

  return (
    <div className="flex flex-col min-[1920px]:hidden gap-y-10 w-full text-base-300 text-medium">
      {/* cards */}
      {voyageTeamMembers.map((teamMember) => (
        <TeamCard key={teamMember.id} teamMember={teamMember} />
      ))}
    </div>
  );
}
