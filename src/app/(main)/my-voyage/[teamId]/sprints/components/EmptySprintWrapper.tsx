"use client";

import "reflect-metadata";
import { redirect } from "next/navigation";
import type { Sprint } from "@chingu-x/modules/sprints";
import ProgressStepper from "./ProgressStepper";
import EmptySprintState from "./EmptySprintState";
import SprintActions from "./SprintActions";
import VoyagePageBannerContainer from "@/components/banner/VoyagePageBannerContainer";
import Banner from "@/components/banner/Banner";
import { currentDate } from "@/utils/getCurrentSprint";
import {
  getSprintCheckinIsStatus,
  getVoyageProjectStatus,
} from "@/utils/getFormStatus";
import { useSprint, useUser } from "@/store/hooks";
import useCheckCurrentVoyageTeam from "@/hooks/useCheckCurrentVoyageTeam";
import { sprintsAdapter, voyageTeamAdapter } from "@/utils/adapters";

interface EmptySprintWrapperProps {
  params: {
    teamId: string;
    sprintNumber: string;
  };
}

export default function EmptySprintWrapper({
  params,
}: EmptySprintWrapperProps) {
  const { teamId } = params;
  const sprintNumber = Number(params.sprintNumber);
  const user = useUser();
  const sprints = useSprint();
  useCheckCurrentVoyageTeam({ user, teamId });

  if (voyageTeamAdapter.getVoyageProjectSubmissionStatus(user)) {
    redirect(`/my-voyage/${teamId}/sprints/`);
  }

  // Check if a meeting exists
  const meeting = sprintsAdapter.getMeeting({
    sprints: sprints.sprints,
    sprintNumber,
  });

  // Get current sprint number
  const { number } = sprintsAdapter.getCurrentSprint({
    currentDate,
    sprints: sprints.sprints,
  }) as Sprint;

  const currentSprintNumber = number;

  // Redirect if a user tries to access a sprint which hasn't started yet
  if (sprintNumber > currentSprintNumber) {
    redirect(`/my-voyage/${teamId}/sprints/${currentSprintNumber}/`);
    // If a user tries to access this page directly, check if the current sprint's meetingId exists.
    // If so, redirect to the existing meeting page.
  } else if (meeting) {
    redirect(
      `/my-voyage/${teamId}/sprints/${sprintNumber}/meeting/${meeting.id}`,
    );
  } else {
    // Check if a checkin form for the current sprint has been submitted
    const sprintCheckinIsSubmitted = getSprintCheckinIsStatus(
      user,
      sprintNumber,
    );

    // Check if a voyage project has been submitted
    const voyageProjectIsSubmitted = getVoyageProjectStatus(user, teamId);

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
        <ProgressStepper currentSprintNumber={currentSprintNumber} />
        <SprintActions
          params={params}
          sprintCheckinIsSubmitted={sprintCheckinIsSubmitted}
          voyageProjectIsSubmitted={voyageProjectIsSubmitted}
          currentSprintNumber={currentSprintNumber}
        />
        <EmptySprintState />
      </div>
    );
  }
}
