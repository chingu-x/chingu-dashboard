"use client";

import "reflect-metadata";
import { redirect } from "next/navigation";

import VoyageSubmittedMessage from "./VoyageSubmittedMessage";

import {
  type FetchSprintsProps,
  type FetchSprintsResponse,
  type SprintsResponse,
} from "@/myVoyage/sprints/sprintsService";

import VoyagePageBannerContainer from "@/components/banner/VoyagePageBannerContainer";
import Banner from "@/components/banner/Banner";

import { getAccessToken } from "@/utils/getCookie";
import { getUser } from "@/utils/getUser";
import { getCurrentSprint } from "@/utils/getCurrentSprint";
import { GET } from "@/utils/requests";
import { CacheTag } from "@/utils/cacheTag";
import { handleAsync } from "@/utils/handleAsync";
import { type AsyncActionResponse } from "@/utils/handleAsync";
import { type Sprint } from "@/store/features/sprint/sprintSlice";
import { getCurrentVoyageData } from "@/utils/getCurrentVoyageData";
import routePaths from "@/utils/routePaths";
import { getCurrentVoyageTeam } from "@/utils/getCurrentVoyageTeam";
import { ErrorType } from "@/utils/error";
import ErrorComponent from "@/components/Error";
import { useUser } from "@/store/hooks";
import useCheckCurrentVoyageTeam from "@/hooks/useCheckCurrentVoyageTeam";
import { useQuery } from "@tanstack/react-query";
import { sprintsAdapter } from "@/utils/adapters";

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

export default function RedirectToCurrentSprintWrapper({
  params,
}: RedirectToCurrentSprintWrapperProps) {
  const { teamId } = params;
  const user = useUser();

  let currentSprintNumber: number;

  useCheckCurrentVoyageTeam({ user, teamId });

  const { isPending, isError, data } = useQuery({
    queryKey: [CacheTag.sprints, { teamId, user: `${user.id}` }],
    queryFn: () => getSprintsQuery({ teamId }),
    staleTime: 1000 * 60 * 30, // This sets it to 30 minutes, which is how long the access token lasts
  });

  async function getSprintsQuery() {
    return await sprintsAdapter.fetchSprints({ teamId });
  }

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }
  if (isError) {
    router.push(routePaths.signIn());
  }

  if (data) {
    dispatch(clientSignIn());
    dispatch(getUserState(data));
  }

  const { projectSubmitted } = getCurrentVoyageTeam({
    teamId,
    user,
    error: null,
  });

  if (projectSubmitted) {
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
    return (
      <ErrorComponent
        errorType={ErrorType.FETCH_VOYAGE_DATA}
        message={errorResponse}
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
}
