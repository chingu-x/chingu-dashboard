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
import { VoyageTeamMember } from "@/store/features/user/userSlice";

export async function fetchSprints({
  teamId,
}: FetchSprintsProps): Promise<AsyncActionResponse<FetchSprintsResponse>> {
  console.log("fetch sprints");

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

  let currentVoyageTeam: VoyageTeamMember | undefined;
  let currentSprintNumber: number;
  let currentMeetingId: number;

  // TODO: replace with a reusable function
  const [user, error] = await getUser();

  if (user) {
    currentVoyageTeam = user.voyageTeamMembers.find(
      (voyage) => voyage.voyageTeam.voyage.status.name === "Active",
    );
  }

  if (error) {
    return `Error: ${error?.message}`;
  }

  if (teamId === currentVoyageTeam?.voyageTeamId) {
    const [res, error] = await fetchSprints({ teamId });

    if (res) {
      const { teamMeetings, number } = getCurrentSprint(
        res.voyage.sprints,
      ) as Sprint;
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
  } else {
    redirect("/");
  }
}
