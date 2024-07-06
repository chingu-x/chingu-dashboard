import { fetchSprints } from "@/myVoyage/sprints/components/RedirectToCurrentSprintWrapper";
import { fetchMeeting } from "@/myVoyage/sprints/components/SprintWrapper";
import type { User } from "@/store/features/user/userSlice";
import type { Sprint, Voyage } from "@/store/features/sprint/sprintSlice";
import type { AppError } from "@/types/types";
import { getCurrentSprint } from "@/utils/getCurrentSprint";
import { getCurrentVoyageData } from "@/utils/getCurrentVoyageData";
import { ErrorType } from "@/utils/error";

interface GetDashboardDataResponse {
  currentSprintNumber: number | null;
  sprintsData: Sprint[];
  user: User | null;
  meetingsData: MeetingEvent[];
  voyageNumber: number | null;
  voyageData: Voyage;
  errorMessage?: string;
  errorType?: ErrorType;
}

export type MeetingEvent = {
  title: string;
  date: string;
  link: string;
  sprint: number;
};

export const getDashboardData = async (
  user: User | null,
  error: AppError | null,
  teamId: number,
): Promise<GetDashboardDataResponse> => {
  let sprintsData: Sprint[] = [];
  let voyageNumber: number | null = null;
  let voyageData: Voyage = {} as Voyage;
  let errorMessage: string | undefined;
  let errorType: ErrorType | undefined;

  const { errorResponse, data } = await getCurrentVoyageData({
    user,
    error,
    teamId,
    args: { teamId },
    func: fetchSprints,
  });

  if (errorResponse) {
    return {
      currentSprintNumber: null,
      sprintsData: [],
      user: null,
      meetingsData: [],
      voyageNumber: null,
      voyageData: {} as Voyage,
      errorMessage: errorResponse,
      errorType: ErrorType.FETCH_VOYAGE_DATA,
    };
  }

  if (data) {
    const [res, error] = data;

    if (error) {
      return {
        currentSprintNumber: null,
        sprintsData: [],
        user: null,
        meetingsData: [],
        voyageNumber: null,
        voyageData: {} as Voyage,
        errorMessage: error.message,
        errorType: ErrorType.FETCH_SPRINT,
      };
    }

    sprintsData = res!.sprints;
    voyageNumber = Number(res!.number);
    voyageData = res!;
  }

  let currentSprintNumber = null;
  if (sprintsData.length > 0) {
    const { number } = getCurrentSprint(sprintsData) as Sprint;
    currentSprintNumber = number;
  }

  const meetingsData: {
    title: string;
    date: string;
    link: string;
    sprint: number;
  }[] = [];

  const fetchMeetingsPromises = sprintsData
    .filter((sprint) => sprint.teamMeetings.length)
    .map((sprint) =>
      fetchMeeting({
        sprintNumber: sprint.number,
        meetingId: sprint.teamMeetings[0]?.id,
      }),
    );

  const fetchMeetingsResults = await Promise.all(fetchMeetingsPromises);

  fetchMeetingsResults.forEach(([res, error]) => {
    if (res) {
      const { title, dateTime, meetingLink, sprint } = res;
      meetingsData.push({
        title,
        date: dateTime,
        link: meetingLink,
        sprint: sprint.number,
      });
    } else if (error) {
      errorMessage = error.message;
      errorType = ErrorType.FETCH_MEETING;
    }
  });

  return {
    currentSprintNumber,
    sprintsData,
    user,
    meetingsData,
    voyageNumber,
    voyageData,
    errorType,
    errorMessage,
  };
};
