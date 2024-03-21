import { redirect } from "next/navigation";

import {
  FetchSprintsProps,
  FetchSprintsResponse,
  SprintsResponse,
} from "@/sprints/sprintsService";

import { getAccessToken } from "@/utils/getCookie";
import getCurrentSprint from "@/utils/getCurrentSprint";
import { GET } from "@/utils/requests";
import { CacheTag } from "@/utils/cacheTag";
import { AsyncActionResponse, handleAsync } from "@/utils/handleAsync";

export async function fetchSprints({
  teamId,
}: FetchSprintsProps): Promise<AsyncActionResponse<FetchSprintsResponse>> {
  const token = getAccessToken();

  const fetchSprintsAsync = () =>
    GET<SprintsResponse>(
      `api/v1/voyages/sprints/teams/${teamId}`,
      token,
      "force-cache",
      CacheTag.sprint,
    );

  return await handleAsync(fetchSprintsAsync);
}

interface SprintsRedirectWrapperProps {
  params: {
    teamId: string;
  };
}

export default async function SprintsRedirectWrapper({
  params,
}: SprintsRedirectWrapperProps) {
  const teamId = Number(params.teamId);

  let currentSprintNumber: number;
  let currentMeetingId: number;

  if (teamId) {
    const [res, error] = await fetchSprints({ teamId });

    if (res) {
      const { teamMeetings, number } = getCurrentSprint(res.voyage.sprints);
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
      return `Error: ${error?.message}`;
    }
  }

  return null;
}
