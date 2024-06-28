import { format } from "date-fns";
import { fetchSprints } from "@/app/(main)/my-voyage/[teamId]/sprints/components/RedirectToCurrentSprintWrapper";
import type { Sprint, Voyage } from "@/store/features/sprint/sprintSlice";
import { getCurrentSprint } from "@/utils/getCurrentSprint";
import { getCurrentVoyageData } from "@/utils/getCurrentVoyageData";
import type { User } from "@/store/features/user/userSlice";
import { fetchMeeting } from "@/app/(main)/my-voyage/[teamId]/sprints/components/SprintWrapper";
import type { AppError } from "@/types/types";
import convertStringToDate from "@/utils/convertStringToDate";
import { fetchResources } from "@/app/(main)/my-voyage/[teamId]/voyage-resources/components/ResourcesComponentWrapper";
import { fetchTechStack } from "@/app/(main)/my-voyage/[teamId]/tech-stack/components/TechStackComponentWrapper";
import { fetchProjectIdeas } from "@/app/(main)/my-voyage/[teamId]/ideation/components/IdeationComponentWrapper";
import { fetchFeatures } from "@/app/(main)/my-voyage/[teamId]/features/components/FeaturesComponentWrapper";
import { type FeaturesList } from "@/store/features/features/featuresSlice";
import { type IdeationData } from "@/store/features/ideation/ideationSlice";
import { type TechStackData } from "@/store/features/techStack/techStackSlice";
import { type ResourceData } from "@/store/features/resources/resourcesSlice";
import type { AsyncActionResponse } from "@/utils/handleAsync";
import { ErrorType } from "@/utils/error";

interface GetDashboardDataResponse {
  currentSprintNumber: number | null;
  sprintsData: Sprint[];
  user: User | null;
  meetingsData: EventList[];
  voyageNumber: number | null;
  voyageData: Voyage;
  features: FeaturesList[];
  projectIdeas: IdeationData[];
  techStackData: TechStackData[];
  projectResources: ResourceData[];
  errorMessage?: string;
  errorType?: ErrorType;
}

export type EventList = {
  title: string;
  date: string;
  link: string;
  sprint: number;
};

interface FetchResult<T> {
  data: T | null;
  error: string | null;
}

const fetchData = async <T, Y>(
  fetchFunc: (args: Y) => Promise<AsyncActionResponse<T>>,
  user: User | null,
  error: AppError | null,
  teamId: number,
  args: Y,
): Promise<FetchResult<T>> => {
  const { errorResponse, data } = await getCurrentVoyageData<T, Y>({
    user,
    error,
    teamId,
    args,
    func: fetchFunc,
  });

  if (errorResponse) {
    return { data: null, error: errorResponse };
  }

  if (data) {
    const [res, err] = data;

    if (err) {
      return { data: null, error: `Error: ${err.message}` };
    }

    return { data: res, error: null };
  }

  return { data: null, error: null };
};

type SprintDataResponse =
  | { sprintsData: Sprint[]; voyageNumber: number | null; voyageData: Voyage }
  | string;

const getSprintsData = async (
  user: User | null,
  error: AppError | null,
  teamId: number,
): Promise<SprintDataResponse> => {
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

  return { sprintsData, voyageNumber, voyageData };
};

export const getDashboardData = async (
  user: User | null,
  error: AppError | null,
  teamId: number,
): Promise<GetDashboardDataResponse> => {
  const sprintsResult = await getSprintsData(user, error, teamId);
  const featuresResult = await fetchData<FeaturesList[], { teamId: number }>(
    fetchFeatures,
    user,
    error,
    teamId,
    { teamId },
  );
  const projectIdeasResult = await fetchData<
    IdeationData[],
    { teamId: number }
  >(fetchProjectIdeas, user, error, teamId, { teamId });
  const techStackResult = await fetchData<TechStackData[], { teamId: number }>(
    fetchTechStack,
    user,
    error,
    teamId,
    { teamId },
  );
  const resourcesResult = await fetchData<ResourceData[], { teamId: number }>(
    fetchResources,
    user,
    error,
    teamId,
    { teamId },
  );

  if (typeof sprintsResult === "string") throw new Error(sprintsResult);
  if (featuresResult.error) throw new Error(featuresResult.error);
  if (projectIdeasResult.error) throw new Error(projectIdeasResult.error);
  if (techStackResult.error) throw new Error(techStackResult.error);
  if (resourcesResult.error) throw new Error(resourcesResult.error);

  let currentSprintNumber = null;
  if (sprintsResult.sprintsData.length > 0) {
    currentSprintNumber =
      getCurrentSprint(sprintsResult.sprintsData)?.number ?? null;
  }

  const fetchMeetingsPromises = sprintsResult.sprintsData.map((sprint) =>
    fetchMeeting({
      sprintNumber: sprint.number,
      meetingId: sprint.teamMeetings[0]?.id,
    }),
  );

  const fetchMeetingsResults = await Promise.all(fetchMeetingsPromises);

  const meetingsData = fetchMeetingsResults
    .map(([res]) => {
      if (res) {
        const { title, dateTime, meetingLink, sprint } = res;
        const parsedDate = convertStringToDate(dateTime, user?.timezone ?? "");
        const formattedDate = format(parsedDate, "yyyy-MM-dd h:mm a");
        return {
          title,
          date: formattedDate,
          link: meetingLink,
          sprint: sprint.number,
        };
      } else if (error) {
        errorMessage = error.message;
        errorType = ErrorType.FETCH_MEETING;
      }
      return null;
    })
    .filter(Boolean) as EventList[];

  return {
    currentSprintNumber,
    sprintsData: sprintsResult.sprintsData,
    user,
    meetingsData,
    voyageNumber: sprintsResult.voyageNumber,
    voyageData: sprintsResult.voyageData,
    features: featuresResult.data!,
    projectIdeas: projectIdeasResult.data!,
    techStackData: techStackResult.data!,
    projectResources: resourcesResult.data!,
  };
};
