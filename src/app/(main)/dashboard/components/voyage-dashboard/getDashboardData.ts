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
}

export type EventList = {
  title: string;
  date: string;
  link: string;
  sprint: number;
};

const getFeaturesData = async (
  user: User | null,
  error: AppError | null,
  teamId: number,
) => {
  let features: FeaturesList[] = [];

  const { errorResponse, data } = await getCurrentVoyageData({
    user,
    error,
    teamId,
    args: { teamId },
    func: fetchFeatures,
  });

  if (errorResponse) {
    return errorResponse;
  }

  if (data) {
    const [res, error] = data;

    if (error) {
      return `Error: ${error.message}`;
    }

    features = res!;
  }

  return { features };
};

const getProjectsIdeasData = async (
  user: User | null,
  error: AppError | null,
  teamId: number,
) => {
  let projectIdeas: IdeationData[] = [];

  const { errorResponse, data } = await getCurrentVoyageData({
    user,
    error,
    teamId,
    args: { teamId },
    func: fetchProjectIdeas,
  });

  if (errorResponse) {
    return errorResponse;
  }

  if (data) {
    const [res, error] = data;

    if (error) {
      return `Error: ${error.message}`;
    }

    projectIdeas = res!;
  }

  return { projectIdeas };
};

export const getTechStackData = async (
  user: User | null,
  error: AppError | null,
  teamId: number,
) => {
  let techStackData: TechStackData[] = [];

  const { errorResponse, data } = await getCurrentVoyageData({
    user,
    error,
    teamId,
    args: { teamId },
    func: fetchTechStack,
  });

  if (errorResponse) {
    return errorResponse;
  }
  if (data) {
    const [res, error] = data;

    if (error) {
      return `Error: ${error.message}`;
    }

    techStackData = res!;
  }

  return { techStackData };
};

const getResourcesData = async (
  user: User | null,
  error: AppError | null,
  teamId: number,
) => {
  let projectResources: ResourceData[] = [];

  const { errorResponse, data } = await getCurrentVoyageData({
    user,
    error,
    teamId,
    args: { teamId },
    func: fetchResources,
  });

  if (errorResponse) {
    return errorResponse;
  }
  if (data) {
    const [res, error] = data;

    if (error) {
      return `Error: ${error.message}`;
    }

    projectResources = res!;
  }

  return { projectResources };
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
  let sprintsData: Sprint[] = [];
  let voyageNumber: number | null = null;
  let voyageData: Voyage = {} as Voyage;
  let features: FeaturesList[] = [];
  let projectIdeas: IdeationData[] = [];
  let techStackData: TechStackData[] = [];
  let projectResources: ResourceData[] = [];

  const sprintsResult = await getSprintsData(user, error, teamId);
  const featuresResult = await getFeaturesData(user, error, teamId);
  const projectIdeasResult = await getProjectsIdeasData(user, error, teamId);
  const techStackResult = await getTechStackData(user, error, teamId);
  const resourcesResult = await getResourcesData(user, error, teamId);

  if (typeof sprintsResult !== "string") {
    ({ sprintsData, voyageNumber, voyageData } = sprintsResult);
  }

  if (typeof featuresResult !== "string") {
    ({ features } = featuresResult);
  }

  if (typeof projectIdeasResult !== "string") {
    ({ projectIdeas } = projectIdeasResult);
  }

  if (typeof techStackResult !== "string") {
    ({ techStackData } = techStackResult);
  }

  if (typeof resourcesResult !== "string") {
    ({ projectResources } = resourcesResult);
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
    features,
    projectIdeas,
    techStackData,
    projectResources,
  };
};
