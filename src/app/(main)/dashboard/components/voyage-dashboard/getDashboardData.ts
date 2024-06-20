import { format } from "date-fns";
import { fetchSprints } from "@/app/(main)/my-voyage/[teamId]/sprints/components/RedirectToCurrentSprintWrapper";
import type { Sprint, Voyage } from "@/store/features/sprint/sprintSlice";
import { getCurrentSprint } from "@/utils/getCurrentSprint";
import { getCurrentVoyageData } from "@/utils/getCurrentVoyageData";
import type { User } from "@/store/features/user/userSlice";
import { fetchMeeting } from "@/app/(main)/my-voyage/[teamId]/sprints/components/SprintWrapper";
import type { AppError } from "@/types/types";
import convertStringToDate from "@/utils/convertStringToDate";

interface GetDashboardDataResponse {
  currentSprintNumber: number | null;
  sprintsData: Sprint[];
  user: User | null;
  meetingsData: EventList[];
  voyageNumber: number | null;
  voyageData: Voyage;
  errorMessage?: string;
}

export type EventList = {
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
    };
  }

  if (data) {
    const [res, error] = data;

    if (error) {
      throw new Error(`Error: ${error.message}`);
    }

    sprintsData = res!.sprints;
    voyageNumber = Number(res!.number);
    voyageData = res!;
  }

  let currentSprintNumber = null;
  if (sprintsData.length > 0) {
    const sprint = getCurrentSprint(sprintsData);
    currentSprintNumber = sprint?.number ?? null;
  }

  const meetingsData: {
    title: string;
    date: string;
    link: string;
    sprint: number;
  }[] = [];

  const fetchMeetingsPromises = sprintsData.map((sprint) =>
    fetchMeeting({
      sprintNumber: sprint.number,
      meetingId: sprint.teamMeetings[0]?.id,
    }),
  );

  const fetchMeetingsResults = await Promise.all(fetchMeetingsPromises);

  fetchMeetingsResults.forEach(([res]) => {
    if (res) {
      const { title, dateTime, meetingLink, sprint } = res;
      const parsedDate = convertStringToDate(dateTime, user?.timezone ?? "");
      const formattedDate = format(parsedDate, "yyyy-MM-dd h:mm a");
      meetingsData.push({
        title,
        date: formattedDate,
        link: meetingLink,
        sprint: sprint.number,
      });
    } else if (error) {
      return `Error: ${error.message}`;
    }
  });

  return {
    currentSprintNumber,
    sprintsData,
    user,
    meetingsData,
    voyageNumber,
    voyageData,
  };
};
