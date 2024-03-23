import { redirect } from "next/navigation";

import { fetchSprints } from "./SprintsRedirectWrapper";
import ProgressStepper from "./ProgressStepper";
import EmptyState from "./EmptyState";
import SprintActions from "./SprintActions";

import EmptySprintProvider from "@/sprints/providers/EmptySprintProvider";
import getCurrentSprint from "@/utils/getCurrentSprint";
import { Sprint } from "@/store/features/sprint/sprintSlice";

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

  if (teamId) {
    const [res, error] = await fetchSprints({ teamId });

    if (res) {
      sprintsData = res.voyage.sprints;
    } else {
      return `Error: ${error?.message}`;
    }
  }

  // Check if a meeting exists
  const meeting = getMeeting(sprintsData, sprintNumber);

  // Get current sprint number
  const { number } = getCurrentSprint(sprintsData) as Sprint;
  const currentSprintNumber = number;

  // If a user tries to access this page directly, check if the current sprint's meetingId exists.
  // If so, redirect to the existing meeting page.
  if (meeting) {
    redirect(
      `/my-voyage/${teamId}/sprints/${sprintNumber}/meeting/${meeting.id}`,
    );
  } else {
    return (
      <>
        <ProgressStepper />
        <SprintActions
          teamId={params.teamId}
          sprintNumber={params.sprintNumber}
        />
        <EmptyState />
        <EmptySprintProvider
          sprints={sprintsData}
          currentSprintNumber={currentSprintNumber}
        />
      </>
    );
  }
}
