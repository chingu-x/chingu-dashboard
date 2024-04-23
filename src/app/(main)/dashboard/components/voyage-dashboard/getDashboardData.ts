import { format, parseISO } from "date-fns";
import { fetchSprints } from "@/app/(main)/my-voyage/[teamId]/sprints/components/RedirectToCurrentSprintWrapper";
import { Sprint } from "@/store/features/sprint/sprintSlice";
import { getCurrentSprint } from "@/utils/getCurrentSprint";
import { getCurrentVoyageData } from "@/utils/getCurrentVoyageData";
import { User } from "@/store/features/user/userSlice";
import { fetchMeeting } from "@/app/(main)/my-voyage/[teamId]/sprints/components/SprintWrapper";
import { AppError } from "@/types/types";

interface GetDashboardDataResponse {
  currentSprintNumber: number | null;
  sprintsData: Sprint[];
  user: User | null;
  meetingsData: EventList[];
  errorMessage?: string;
}

export type EventList = {
  title: string;
  date: string;
  link: string;
};

export const getDashboardData = async (
  user: User | null,
  error: AppError | null,
  teamId: number,
): Promise<GetDashboardDataResponse> => {
  let sprintsData: Sprint[] = [];

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
      errorMessage: errorResponse,
    };
  }

  if (data) {
    const [res] = data;

    sprintsData = res!.voyage.sprints;
  }

  const { number } = getCurrentSprint(sprintsData) as Sprint;
  const currentSprintNumber = number;

  const meetingsData: { title: string; date: string; link: string }[] = [];

  const fetchMeetingsPromises = sprintsData.map((sprint) =>
    fetchMeeting({
      sprintNumber: sprint.number,
      meetingId: sprint.teamMeetings[0]?.id,
    }),
  );

  const fetchMeetingsResults = await Promise.all(fetchMeetingsPromises);

  fetchMeetingsResults.forEach(([res]) => {
    if (res) {
      const { title, dateTime, meetingLink } = res;
      const parsedDate = parseISO(dateTime);
      const formattedDate = format(parsedDate, "yyyy-MM-dd h:mm a");
      meetingsData.push({
        title,
        date: formattedDate,
        link: meetingLink,
      });
    } else {
      return;
    }
  });

  return {
    currentSprintNumber,
    sprintsData,
    user,
    meetingsData,
  };
};
