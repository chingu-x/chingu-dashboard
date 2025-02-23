import { redirect } from "next/navigation";

import { Banner } from "@chingu-x/components/banner";
import Image from "next/image";
import { BannerContainer } from "@chingu-x/components/banner-container";
import VoyageSubmittedMessage from "./VoyageSubmittedMessage";

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
import { ErrorType } from "@/utils/error";
import ErrorComponent from "@/components/Error";

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

  const [user, error] = await getUser();

  const { currentTeam, projectSubmitted } = getCurrentVoyageTeam({
    teamId,
    user,
    error: null,
  });

  if (currentTeam && projectSubmitted) {
    return (
      <div className="flex w-full flex-col gap-y-10">
        <BannerContainer
          title="Sprints"
          description="A sprint agenda helps the team stay on track, communicate well, and improve. Basically, it's like speed dating for developers. Except we're not looking for a soulmate, we're just trying to get some quality work done."
        >
          <Banner
            imageLight={
              <Image
                src="/img/sprints_banner_light.png"
                alt="Light sprints banner"
                fill={true}
                sizes="276px"
                priority
                style={{ objectFit: "contain" }}
              />
            }
            imageDark={
              <Image
                src="/img/sprints_banner_dark.png"
                alt="Dark sprints banner"
                fill={true}
                sizes="276px"
                priority
                style={{ objectFit: "contain" }}
              />
            }
            height="h-[200px]"
            width="w-[276px]"
          />
        </BannerContainer>
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
    return (
      <ErrorComponent
        errorType={ErrorType.FETCH_VOYAGE_DATA}
        message={errorResponse}
      />
    );
  }

  if (data) {
    const [res, error] = data;

    if (error) {
      return (
        <ErrorComponent
          errorType={ErrorType.FETCH_SPRINT}
          message={error.message}
        />
      );
    }
    const { teamMeetings, number } = getCurrentSprint(res!.sprints) as Sprint;

    currentSprintNumber = number;

    if (teamMeetings.length !== 0) {
      redirect(
        `/my-voyage/${teamId}/sprints/${currentSprintNumber}/meeting/${teamMeetings[0]}`,
      );
    } else {
      redirect(`/my-voyage/${teamId}/sprints/${currentSprintNumber}`);
    }
  } else {
    redirect(routePaths.dashboardPage());
  }
}
