import { redirect } from "next/navigation";

import { Banner } from "@chingu-x/components/banner";
import Image from "next/image";
import { BannerContainer } from "@chingu-x/components/banner-container";
import { fetchSprints } from "./RedirectToCurrentSprintWrapper";
import ProgressStepper from "./ProgressStepper";
import EmptySprintState from "./EmptySprintState";
import SprintActions from "./SprintActions";

import EmptySprintProvider from "@/myVoyage/sprints/providers/EmptySprintProvider";
import { getCurrentSprint } from "@/utils/getCurrentSprint";
import { type Voyage, type Sprint } from "@/store/features/sprint/sprintSlice";
import { getUser } from "@/utils/getUser";
import { getCurrentVoyageData } from "@/utils/getCurrentVoyageData";
import routePaths from "@/utils/routePaths";
import {
  getSprintCheckinIsStatus,
  getVoyageProjectStatus,
} from "@/utils/getFormStatus";
import { getCurrentVoyageTeam } from "@/utils/getCurrentVoyageTeam";
import { ErrorType } from "@/utils/error";
import ErrorComponent from "@/components/Error";

function getMeeting(sprints: Sprint[], sprintNumber: number) {
  const sprint = sprints.find((sprint) => sprint.number === sprintNumber);

  if (sprint?.teamMeetingsData && sprint?.teamMeetingsData.length > 0)
    return sprint.teamMeetingsData[0];
  return null;
}

interface EmptySprintWrapperProps {
  params: {
    teamId: string;
    sprintNumber: string;
  };
}

export default async function EmptySprintWrapper({
  params,
}: EmptySprintWrapperProps) {
  const teamId = Number(params.teamId);
  const sprintNumber = Number(params.sprintNumber);

  let voyageData: Voyage;

  const [user, error] = await getUser();

  const { currentTeam, projectSubmitted } = getCurrentVoyageTeam({
    teamId,
    user,
    error: null,
  });

  if (currentTeam && projectSubmitted) {
    redirect(`/my-voyage/${teamId}/sprints/`);
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
    voyageData = res!;
  } else {
    redirect(routePaths.dashboardPage());
  }

  // Check if a meeting exists
  const meeting = getMeeting(voyageData.sprints, sprintNumber);

  // Get current sprint number
  const { number } = getCurrentSprint(voyageData.sprints) as Sprint;
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
          voyageProjectIsSubmitted={voyageProjectIsSubmitted}
          currentSprintNumber={currentSprintNumber}
        />
        <EmptySprintState />
        <EmptySprintProvider voyage={voyageData} />
      </div>
    );
  }
}
