import { redirect } from "next/navigation";

import { fetchSprints } from "./RedirectToCurrentSprintWrapper";
import ProgressStepper from "./ProgressStepper";
import EmptySprintState from "./EmptySprintState";
import SprintActions from "./SprintActions";
import VoyagePageBannerContainer from "@/components/banner/VoyagePageBannerContainer";
import Banner from "@/components/banner/Banner";

import EmptySprintProvider from "@/myVoyage/sprints/providers/EmptySprintProvider";
import { getCurrentSprint } from "@/utils/getCurrentSprint";
import { type Sprint } from "@/store/features/sprint/sprintSlice";
import { getUser } from "@/utils/getUser";
import { getCurrentVoyageData } from "@/utils/getCurrentVoyageData";
import routePaths from "@/utils/routePaths";

function getMeeting(sprints: Sprint[], sprintNumber: number) {
  const sprint = sprints.find((sprint) => sprint.number === sprintNumber);

  if (sprint?.teamMeetings && sprint?.teamMeetings.length > 0)
    return sprint.teamMeetings[0];
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

  let sprintsData: Sprint[] = [];

  const [user, error] = await getUser();

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
    sprintsData = res!.voyage.sprints;
  } else {
    redirect(routePaths.dashboardPage());
  }

  // Check if a meeting exists
  const meeting = getMeeting(sprintsData, sprintNumber);

  // Get current sprint number
  const { number } = getCurrentSprint(sprintsData) as Sprint;
  const currentSprintNumber = number;

  // Redirect if a user tries to access a sprint which hasn't started yet
  if (sprintNumber > currentSprintNumber) {
    redirect(`/my-voyage/${teamId}/sprints/${currentSprintNumber}/`);
    // If a user tries to access this page directly, check if the current sprint's meetingId exists.
    // If so, redirect to the existing meeting page.
  } else if (meeting) {
    redirect(
      `/my-voyage/${teamId}/sprints/${sprintNumber}/meeting/${meeting.id}`
    );
  } else {
    return (
      <div className="flex flex-col w-full gap-y-10">
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
        <ProgressStepper />
        <SprintActions params={params} />
        <EmptySprintState />
        <EmptySprintProvider
          sprints={sprintsData}
          currentSprintNumber={currentSprintNumber}
        />
      </div>
    );
  }
}
