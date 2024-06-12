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
import { getCurrentVoyageTeam } from "@/utils/getCurrentVoyageTeam";
import VoyagePageBannerContainer from "@/components/banner/VoyagePageBannerContainer";
import Banner from "@/components/banner/Banner";
import VoyageSubmittedMessage from "./VoyageSubmittedMessage";

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

  const { currentTeam, projectSubmitted } = getCurrentVoyageTeam({
    teamId,
    user,
    error: null,
  });

  if (currentTeam && projectSubmitted) {
    return (
      <div className="flex w-full flex-col gap-y-10">
        <VoyagePageBannerContainer
          title="Sprints"
          description="A sprint agenda helps the team stay on track, communicate well, and improve. Basically, it's like speed dating for developers. Except we're not looking for a soulmate, we're just trying to get some quality work done."
        >
          <Banner
            imageLight="/img/sprints_banner_light.png"
            imageDark="/img/sprints_banner_dark.png"
            alt="sprints_banner"
            height="h-[200px]"
            width="w-[276px]"
          />
        </VoyagePageBannerContainer>
        <VoyageSubmittedMessage />
      </div>
    );
  }

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
