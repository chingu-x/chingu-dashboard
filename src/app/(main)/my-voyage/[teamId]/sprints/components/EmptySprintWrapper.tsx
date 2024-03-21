import { redirect } from "next/navigation";

import { fetchSprints } from "./SprintsRedirectWrapper";
import ProgressStepper from "./ProgressStepper";
import EmptyState from "./EmptyState";
import SprintActions from "./SprintActions";

import EmptySprintProvider from "@/sprints/providers/EmptySprintProvider";
import getCurrentSprint from "@/utils/getCurrentSprint";
import { Sprint } from "@/store/features/sprint/sprintSlice";

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
  let sprintsData: Sprint[] = [];

  if (teamId) {
    const [res, error] = await fetchSprints({ teamId });

    if (res) {
      sprintsData = res.voyage.sprints;
    } else {
      return `Error: ${error?.message}`;
    }
  }

  // Get current sprint number and current meeting id
  const { teamMeetings, number } = getCurrentSprint(sprintsData);
  const currentSprintNumber = number;
  const currentMeetingId = teamMeetings[0]?.id;

  // If a user tries to access this page directly, check if the current sprint's meetingId exists.
  // If so, redirect to the existing meeting page.
  if (currentMeetingId) {
    redirect(
      `/my-voyage/${teamId}/sprints/${currentSprintNumber}/meeting/${currentMeetingId}`,
    );
  }

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
