import { fetchSprints } from "@/myVoyage/sprints/components/RedirectToCurrentSprintWrapper";
import { fetchMeeting } from "@/myVoyage/sprints/components/SprintWrapper";
import type { User } from "@/store/features/user/userSlice";
import type { Sprint, Voyage } from "@/store/features/sprint/sprintSlice";
import { type AppError } from "@/types/types";
import { type AsyncActionResponse } from "@/utils/handleAsync";
import { getCurrentSprint } from "@/utils/getCurrentSprint";
import { getCurrentVoyageData } from "@/utils/getCurrentVoyageData";
import { fetchResources } from "@/app/(main)/my-voyage/[teamId]/voyage-resources/components/ResourcesComponentWrapper";
import { fetchTechStack } from "@/app/(main)/my-voyage/[teamId]/tech-stack/components/TechStackComponentWrapper";
import { fetchProjectIdeas } from "@/app/(main)/my-voyage/[teamId]/ideation/components/IdeationComponentWrapper";
import { fetchFeatures } from "@/app/(main)/my-voyage/[teamId]/features/components/FeaturesComponentWrapper";
import { type FeaturesList } from "@/store/features/features/featuresSlice";
import { type IdeationData } from "@/store/features/ideation/ideationSlice";
import { type TechStackData } from "@/store/features/techStack/techStackSlice";
import { type ResourceData } from "@/store/features/resources/resourcesSlice";
import { ErrorType } from "@/utils/error";

interface GetDashboardDataResponse {
  currentSprintNumber: number | null;
  sprintsData: Sprint[];
  user: User | null;
  meetingsData: Event[];
  voyageNumber: number | null;
  voyageData: Voyage;
  features: FeaturesList[];
  projectIdeas: IdeationData[];
  techStackData: TechStackData[];
  projectResources: ResourceData[];
  errorMessage?: string | undefined;
  errorType?: ErrorType | undefined;
}

export type Event = {
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
  | {
      sprintsData: Sprint[];
      voyageNumber: number | null;
      voyageData: Voyage;
      errorMessage: string;
      errorType?: ErrorType;
    }
  | string;

const getSprintsData = async (
  user: User | null,
  error: AppError | null,
  teamId: number,
): Promise<SprintDataResponse> => {
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
      sprintsData: [],
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
        sprintsData: [],
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

  return {
    sprintsData,
    voyageNumber,
    voyageData,
    errorMessage: "",
    errorType: undefined,
  };
};

export const getDashboardData = async (
  user: User | null,
  error: AppError | null,
  teamId: number,
): Promise<GetDashboardDataResponse> => {
  let errorMessage: string | undefined;
  let errorType: ErrorType | undefined;
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

  if (typeof sprintsResult === "string")
    return {
      currentSprintNumber: null,
      sprintsData: [],
      user: null,
      meetingsData: [],
      voyageNumber: null,
      voyageData: {} as Voyage,
      features: [],
      projectIdeas: [],
      techStackData: [],
      projectResources: [],
      errorMessage: sprintsResult,
      errorType: ErrorType.FETCH_SPRINT,
    };

  let currentSprintNumber = null;
  if (sprintsResult.sprintsData.length > 0) {
    currentSprintNumber =
      getCurrentSprint(sprintsResult.sprintsData)?.number ?? null;
  }

  const fetchMeetingsPromises = sprintsResult.sprintsData
    .filter((sprint) => sprint.teamMeetings.length)
    .map((sprint) =>
      fetchMeeting({
        sprintNumber: sprint.number,
        meetingId: sprint.teamMeetings[0]?.id,
      }),
    );

  const fetchMeetingsResults = await Promise.all(fetchMeetingsPromises);

  const meetingsData = fetchMeetingsResults
    .map(([res, err]) => {
      if (res) {
        const { title, dateTime, meetingLink, sprint } = res;
        return {
          title,
          date: dateTime,
          link: meetingLink,
          sprint: sprint.number,
        };
      } else if (err) {
        errorMessage = err.message;
        errorType = ErrorType.FETCH_MEETING;
      }
      return null;
    })
    .filter(Boolean) as Event[];

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
    errorMessage,
    errorType,
  };
};
