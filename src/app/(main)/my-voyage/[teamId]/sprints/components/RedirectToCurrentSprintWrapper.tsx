"use client";

import "reflect-metadata";
import { redirect } from "next/navigation";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import type { Sprint } from "@chingu-x/modules/sprints";
import { BannerContainer } from "@chingu-x/components/banner-container";
import { Banner } from "@chingu-x/components/banner";
import VoyageSubmittedMessage from "./VoyageSubmittedMessage";
import { currentDate } from "@/utils/getCurrentSprint";
import { CacheTag } from "@/utils/cacheTag";
import { ErrorType } from "@/utils/error";
import ErrorComponent from "@/components/Error";
import { useAppDispatch, useUser } from "@/store/hooks";
import useCheckCurrentVoyageTeam from "@/hooks/useCheckCurrentVoyageTeam";
import {
  myTeamAdapter,
  sprintsAdapter,
  voyageTeamAdapter,
} from "@/utils/adapters";
import Spinner from "@/components/Spinner";
import { fetchSprints } from "@/store/features/sprint/sprintSlice";
import { fetchTeamDirectory } from "@/store/features/my-team/myTeam";

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
    queryFn: fetchSprintsQuery,
  });

  async function fetchSprintsQuery() {
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
