import { redirect } from "next/navigation";

// import { mockSprintsData } from "./fixtures/Sprints";
import { Sprint } from "@/store/features/sprint/sprintSlice";
import getCurrentSprint from "@/utils/getCurrentSprint";
import {
  FetchSprintsProps,
  FetchSprintsResponse,
  SprintsResponse,
} from "@/sprints/sprintsService";
import { getAccessToken } from "@/utils/getCookie";
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
  let sprintsData: Sprint[] = [];
  const teamId = +params.teamId;

  if (teamId) {
    const [res, error] = await fetchSprints({ teamId });

    if (res) {
      sprintsData = res.voyage.sprints;
    } else {
      return `Error: ${error?.message}`;
    }
  }

  const { teamMeetings, number } = getCurrentSprint(sprintsData);
  const currentSprintNumber = number;
  const currentMeetingId = teamMeetings[0]?.id;

  if (teamId) {
    if (currentMeetingId) {
      redirect(
        `/my-voyage/${teamId}/sprints/${currentSprintNumber}/meeting/${currentMeetingId}`,
      );
    } else {
      redirect(`/my-voyage/${teamId}/sprints/${currentSprintNumber}`);
    }
  }

  return null;
}
