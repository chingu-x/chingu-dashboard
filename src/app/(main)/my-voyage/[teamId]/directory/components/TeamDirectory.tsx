import { teamMembers } from "./fixtures/MyTeam";

import TeamMemberDataItemWrapper from "./TeamMemberDataItemWrapper";
import TextInput from "@/components/inputs/TextInput";
import { cn } from "@/lib/utils";

// Temp:
const currentUserId = "1";

export default function TeamDirectory() {
  return (
    <div className="flex flex-col w-full px-10 pt-10 pb-4 bg-transparent border-separate border-none rounded-2xl 3xl:bg-secondary-content text-base-300 gap-y-10 3xl:gap-y-1">
      {/* header - table only */}
      <div className="items-center hidden text-xl font-semibold mb-9 text-base-300 3xl:grid 3xl:grid-cols-5">
        <h2>Name</h2>
        <h2>Discord ID</h2>
        <h2>Average Hour/Sprint</h2>
        <h2>Time Zone</h2>
        <h2>Position</h2>
      </div>
      {/* data */}
      {teamMembers.map((teamMember) => {
        const avgHours =
          teamMember.averageHour === 0 ? "Add hours" : teamMember.averageHour;
        return (
          <div
            key={teamMember.id}
            className={cn(
              "flex flex-col items-center p-8 text-base font-medium 3xl:grid 3xl:grid-cols-5 text-base-300 bg-secondary-content 3xl:bg-transparent 3xl:p-0 rounded-2xl 3xl:rounded-none",
              teamMember.id !== currentUserId && "3xl:pb-4",
            )}
          >
            <TeamMemberDataItemWrapper label="Name">
              {teamMember.name}
            </TeamMemberDataItemWrapper>
            <TeamMemberDataItemWrapper label="Discord ID">
              {teamMember.discordId}
            </TeamMemberDataItemWrapper>
            <TeamMemberDataItemWrapper
              label="Average Hour/Sprint"
              className="pb-3 3xl:pb-0"
            >
              <div className="max-w-[227px]">
                {teamMember.id !== currentUserId && avgHours}
                {teamMember.id === currentUserId && (
                  <TextInput
                    id="temp"
                    placeholder="Add hours"
                    submitButtonText="Save"
                    errorMessage="cfwew"
                  />
                )}
              </div>
            </TeamMemberDataItemWrapper>
            <TeamMemberDataItemWrapper label="Timezone">
              {teamMember.timeZone}
            </TeamMemberDataItemWrapper>
            <TeamMemberDataItemWrapper
              label="Position"
              className="pb-0 3xl:pb-4"
            >
              {teamMember.position}
            </TeamMemberDataItemWrapper>
          </div>
        );
      })}
    </div>
  );
}
