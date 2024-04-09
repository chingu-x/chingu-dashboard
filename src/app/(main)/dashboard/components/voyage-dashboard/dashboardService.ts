import { fetchSprints } from "@/app/(main)/my-voyage/[teamId]/sprints/components/RedirectToCurrentSprintWrapper";
import { Meeting, Sprint } from "@/store/features/sprint/sprintSlice";
import { getCurrentSprint } from "@/utils/getCurrentSprint";
import { getCurrentVoyageData } from "@/utils/getCurrentVoyageData";
import { User } from "@/store/features/user/userSlice";
import { fetchMeeting } from "@/app/(main)/my-voyage/[teamId]/sprints/components/SprintWrapper";
import { AppError } from "@/types/types";

interface DashboardServiceResponse {
  currentSprintNumber: number;
  sprintsData: Sprint[];
  user: User;
  meetingData: Meeting;
}
export const dashboardService = async (
  user: User,
  error: AppError | null,
): Promise<DashboardServiceResponse> => {
  let sprintsData: Sprint[] = [];

  const teamMember = user?.voyageTeamMembers.find(
    (voyage) => voyage.voyageTeam.voyage.status.name === "Active",
  );

  if (!teamMember) {
    throw new Error("Active team not found for user");
  }

  const teamId = teamMember.voyageTeamId;

  const { errorResponse, data } = await getCurrentVoyageData({
    user,
    error,
    teamId,
    args: { teamId },
    func: fetchSprints,
  });

  if (errorResponse) {
    return errorResponse;
  }

  if (data) {
    const [res, error] = data;

    if (error) {
      return `Error: ${error.message}`;
    }
    sprintsData = res!.voyage.sprints;
  }

  const { number } = getCurrentSprint(sprintsData) as Sprint;
  const currentSprintNumber = number;

  const meetingId = sprintsData.find((sprint) => sprint.number === 1)
    ?.teamMeetings[0]?.id;

  let meetingData: Meeting;

  if (meetingId) {
    const [res, error] = await fetchMeeting({
      sprintNumber: currentSprintNumber,
      meetingId,
    });

    if (res) {
      meetingData = res;
    } else {
      return `Error: ${error?.message}`;
    }
  }

  return {
    currentSprintNumber,
    sprintsData,
    user,
    meetingData,
  };
};
