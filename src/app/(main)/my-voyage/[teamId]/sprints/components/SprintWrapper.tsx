"use client";

import "reflect-metadata";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { Sprint } from "@chingu-x/modules/sprints";
import { Forms } from "@chingu-x/modules/forms";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { BannerContainer } from "@chingu-x/components/banner-container";
import { Banner } from "@chingu-x/components/banner";
import ProgressStepper from "./ProgressStepper";
import MeetingOverview from "./meetingOverview/MeetingOverview";
import Agendas from "./agenda/Agendas";
import Sections from "./sections/Sections";
import SprintActions from "./SprintActions";
import { currentDate } from "@/utils/getCurrentSprint";
import { ErrorType } from "@/utils/error";
import ErrorComponent from "@/components/Error";
import { useAppDispatch, useSprint, useUser } from "@/store/hooks";
import useCheckCurrentVoyageTeam from "@/hooks/useCheckCurrentVoyageTeam";
import {
  sprintMeetingAdapter,
  sprintsAdapter,
  voyageTeamAdapter,
} from "@/utils/adapters";
import { CacheTag } from "@/utils/cacheTag";
import Spinner from "@/components/Spinner";
import { fetchMeeting } from "@/store/features/sprint/sprintSlice";

interface SprintWrapperProps {
  params: {
    teamId: string;
    sprintNumber: string;
    meetingId: string;
  };
}

export default function SprintWrapper({ params }: SprintWrapperProps) {
  const { teamId } = params;
  const sprintNumber = Number(params.sprintNumber);
  const meetingId = Number(params.meetingId);
  const user = useUser();
  const sprints = useSprint();
  const dispatch = useAppDispatch();
  const router = useRouter();

  useCheckCurrentVoyageTeam({ user, teamId });

  const isVoyageProjectSubmitted =
    voyageTeamAdapter.getVoyageProjectSubmissionStatus(user)!;

  if (isVoyageProjectSubmitted) {
    router.push(`/my-voyage/${teamId}/sprints/`);
  }

  const { isPending, isError, error, data } = useQuery({
    queryKey: [
      CacheTag.sprintMeetingId,
      { teamId, user: `${user.id}`, meetingId: `${meetingId}` },
    ],
    queryFn: fetchMeetingQuery,
  });

  async function fetchMeetingQuery() {
    return await sprintMeetingAdapter.fetchMeeting({ meetingId });
  }

  useEffect(() => {
    if (data) {
      dispatch(fetchMeeting(data));
    }
  }, [data, dispatch]);

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

  // Get current sprint number
  const { number, id } = sprintsAdapter.getCurrentSprint({
    currentDate,
    sprints: sprints.sprints,
  }) as Sprint;

  const currentSprintNumber = number;

  // Redirect if a user tries to access a sprint which hasn't started yet
  if (sprintNumber > currentSprintNumber) {
    router.push(`/my-voyage/${teamId}/sprints/${currentSprintNumber}/`);
  }

  // Check if a checkin form for the current sprint has been submitted
  const sprintCheckinIsSubmitted = sprintsAdapter.getSprintCheckinStatus({
    user,
    sprintId: id,
  });

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

      <ProgressStepper currentSprintNumber={currentSprintNumber} />
      <SprintActions
        params={params}
        sprintCheckinIsSubmitted={sprintCheckinIsSubmitted}
        voyageProjectIsSubmitted={isVoyageProjectSubmitted}
        currentSprintNumber={currentSprintNumber}
      />
      <MeetingOverview
        title={data.title!}
        dateTime={data.dateTime!}
        meetingLink={data.meetingLink!}
        description={data.description!}
      />
      <Agendas params={params} topics={data.agendas!} />
      <Sections
        params={params}
        notes={data.notes}
        planning={data.formResponseMeeting!.find(
          (section) => section.form.id === Number(Forms.planning),
        )}
        review={data.formResponseMeeting!.find(
          (section) => section.form.id === Number(Forms.review),
        )}
      />
    </div>
  );
}
