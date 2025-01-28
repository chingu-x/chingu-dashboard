"use client";

import "reflect-metadata";
import { redirect } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import type { Sprint } from "@chingu-x/modules/sprints";
import VoyageSubmittedMessage from "./VoyageSubmittedMessage";
import VoyagePageBannerContainer from "@/components/banner/VoyagePageBannerContainer";
import Banner from "@/components/banner/Banner";
import { currentDate } from "@/utils/getCurrentSprint";
import { CacheTag } from "@/utils/cacheTag";
import { ErrorType } from "@/utils/error";
import ErrorComponent from "@/components/Error";
import { useAppDispatch, useUser } from "@/store/hooks";
import useCheckCurrentVoyageTeam from "@/hooks/useCheckCurrentVoyageTeam";
import { sprintsAdapter, voyageTeamAdapter } from "@/utils/adapters";
import Spinner from "@/components/Spinner";
import { fetchSprints } from "@/store/features/sprint/sprintSlice";

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
  const dispatch = useAppDispatch();

  useCheckCurrentVoyageTeam({ user, teamId });

  const { isPending, isError, error, data } = useQuery({
    queryKey: [CacheTag.sprints, { teamId, user: `${user.id}` }],
    queryFn: getSprintsQuery,
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
    return (
      <ErrorComponent
        errorType={ErrorType.FETCH_SPRINT}
        message={error.message}
      />
    );
  }

  if (data) {
    dispatch(fetchSprints(data));
  }

  if (voyageTeamAdapter.getVoyageProjectSubmissionStatus(user)) {
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

  const { teamMeetings, number } = sprintsAdapter.getCurrentSprint({
    sprints: data.sprints,
    currentDate,
  }) as Sprint;

  const currentSprintNumber = number;

  if (teamMeetings.length !== 0) {
    redirect(
      `/my-voyage/${teamId}/sprints/${currentSprintNumber}/meeting/${teamMeetings[0]}`,
    );
  } else {
    redirect(`/my-voyage/${teamId}/sprints/${currentSprintNumber}`);
  }
}
