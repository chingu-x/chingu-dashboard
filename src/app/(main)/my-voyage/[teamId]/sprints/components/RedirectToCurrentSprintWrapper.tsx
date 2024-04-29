import { redirect } from "next/navigation";

import {
  FetchSprintsProps,
  FetchSprintsResponse,
  SprintsResponse,
} from "@/myVoyage/sprints/sprintsService";

import { getAccessToken } from "@/utils/getCookie";
import { getUser } from "@/utils/getUser";
import { getCurrentSprint } from "@/utils/getCurrentSprint";
import { GET } from "@/utils/requests";
import { CacheTag } from "@/utils/cacheTag";
import { AsyncActionResponse, handleAsync } from "@/utils/handleAsync";
import { Sprint } from "@/store/features/sprint/sprintSlice";
import { getCurrentVoyageData } from "@/utils/getCurrentVoyageData";
import routePaths from "@/utils/routePaths";

export async function fetchSprints({
  teamId,
}: FetchSprintsProps): Promise<AsyncActionResponse<FetchSprintsResponse>> {
  const token = getAccessToken();
  const fetchSprintsAsync = () =>
    GET<SprintsResponse>(
      `api/v1/voyages/sprints/teams/${teamId}`,
      token,
      "force-cache",
      CacheTag.sprints
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
    return errorResponse;
  }

  if (data) {
    const [res, error] = data;

    if (error) {
      return `Error: ${error.message}`;
    }
    const { teamMeetings, number } = getCurrentSprint(
      res!.voyage.sprints
    ) as Sprint;
    currentSprintNumber = number;
    currentMeetingId = teamMeetings[0]?.id;

    if (currentMeetingId) {
      redirect(
        `/my-voyage/${teamId}/sprints/${currentSprintNumber}/meeting/${currentMeetingId}`
      );
    } else {
      redirect(`/my-voyage/${teamId}/sprints/${currentSprintNumber}`);
    }
  } else {
    redirect(routePaths.dashboardPage());
  }
}
