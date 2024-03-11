import { teamMembers } from "./fixtures/MyTeam";

import TeamMemberDataItemWrapper from "./TeamMemberDataItemWrapper";
import TextInput from "@/components/inputs/TextInput";
import { cn } from "@/lib/utils";

// Temp:
const currentUserId = "4";

export default function TeamDirectory() {
  return (
    <div className="flex flex-col w-full p-10 pb-4 bg-transparent border-separate border-none rounded-2xl 3xl:bg-secondary-content text-base-300 gap-y-10 3xl:gap-y-0">
      {/* header - table only */}
      <div className="items-center hidden mb-6 text-xl font-semibold text-base-300 3xl:grid 3xl:grid-cols-5">
        <h2>Name</h2>
        <h2>Discord ID</h2>
        <h2>Time Zone</h2>
        <h2>Position</h2>
        <h2>Average Hour/Sprint</h2>
      </div>
      {/* data */}
      {teamMembers.map((teamMember) => {
        const isCurrentUser = teamMember.id === currentUserId;
        const avgHours =
          teamMember.averageHour === 0 ? "Add hours" : teamMember.averageHour;
        return (
          <div
            key={teamMember.id}
            className={cn(
              "flex flex-col items-center p-8 text-base font-medium 3xl:grid 3xl:grid-cols-5 text-base-300 bg-secondary-content 3xl:bg-transparent 3xl:p-0 rounded-2xl 3xl:rounded-none",
              isCurrentUser && "pt-8 pb-3"
            )}
          >
            <TeamMemberDataItemWrapper label="Name">
              {teamMember.name}
            </TeamMemberDataItemWrapper>
            <TeamMemberDataItemWrapper label="Discord ID">
              {teamMember.discordId}
            </TeamMemberDataItemWrapper>
            <TeamMemberDataItemWrapper label="Timezone">
              {teamMember.timeZone}
            </TeamMemberDataItemWrapper>
            <TeamMemberDataItemWrapper
              label="Position"
              className={`${isCurrentUser && "pb-0"}`}
            >
              {teamMember.position}
            </TeamMemberDataItemWrapper>
            <TeamMemberDataItemWrapper
              label="Average Hour/Sprint"
              className="pb-0"
            >
              <div className={`max-w-[227px] ${isCurrentUser && "pt-4"}`}>
                {!isCurrentUser && avgHours}
                {isCurrentUser && (
                  <TextInput
                    id="temp"
                    placeholder="Add hours"
                    submitButtonText="Save"
                  />
                )}
              </div>
            </TeamMemberDataItemWrapper>
          </div>
        );
      })}
    </div>
  );
}
