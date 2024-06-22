import { redirect } from "next/navigation";

import {
  type FetchSprintsProps,
  type FetchSprintsResponse,
  type SprintsResponse,
} from "@/myVoyage/sprints/sprintsService";

import { getAccessToken } from "@/utils/getCookie";
import { getUser } from "@/utils/getUser";
import { getCurrentSprint } from "@/utils/getCurrentSprint";
import { GET } from "@/utils/requests";
import { CacheTag } from "@/utils/cacheTag";
import { type AsyncActionResponse, handleAsync } from "@/utils/handleAsync";
import { type Sprint } from "@/store/features/sprint/sprintSlice";
import { getCurrentVoyageData } from "@/utils/getCurrentVoyageData";
import routePaths from "@/utils/routePaths";
import { ErrorType } from "@/utils/error";

export async function fetchSprints({
  teamId,
}: FetchSprintsProps): Promise<AsyncActionResponse<FetchSprintsResponse>> {
  const token = getAccessToken();
  const fetchSprintsAsync = () =>
    GET<SprintsResponse>(
      `api/v1/voyages/sprints/teams/${teamId}`,
      token,
      "force-cache",
      CacheTag.sprints,
    );

  return await handleAsync(fetchSprintsAsync);
}

interface RedirectToCurrentSprintWrapperProps {
  params: {
    teamId: string;
  };
}

export default async function RedirectToCurrentSprintWrapper({
  params,
}: RedirectToCurrentSprintWrapperProps) {
  const teamId = Number(params.teamId);

  let currentSprintNumber: number;
  let currentMeetingId: number;

  const [user, error] = await getUser();

  const { errorResponse, data } = await getCurrentVoyageData({
    user,
    error,
    teamId,
    args: { teamId },
    func: fetchSprints,
  });

  if (errorResponse) {
    return `${ErrorType.VOYAGE_DATA} ${errorResponse}`;
  }

  if (data) {
    const [res, error] = data;

    if (error) {
      return `${ErrorType.FETCH_SPRINT} ${error.message}`;
    }
    const { teamMeetings, number } = getCurrentSprint(res!.sprints) as Sprint;
    currentSprintNumber = number;
    currentMeetingId = teamMeetings[0]?.id;

    if (currentMeetingId) {
      redirect(
        `/my-voyage/${teamId}/sprints/${currentSprintNumber}/meeting/${currentMeetingId}`,
      );
    } else {
      redirect(`/my-voyage/${teamId}/sprints/${currentSprintNumber}`);
    }
  } else {
    redirect(routePaths.dashboardPage());
  }
}
