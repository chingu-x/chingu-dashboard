import { redirect } from "next/navigation";

import { fetchSprints } from "./RedirectToCurrentSprintWrapper";
import ProgressStepper from "./ProgressStepper";
import EmptySprintState from "./EmptySprintState";
import SprintActions from "./SprintActions";

import EmptySprintProvider from "@/sprints/providers/EmptySprintProvider";
import { getCurrentSprint } from "@/utils/getCurrentSprint";
import { Sprint } from "@/store/features/sprint/sprintSlice";
import { VoyageTeamMember } from "@/store/features/user/userSlice";
import { getUser } from "@/utils/getUser";

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

  let currentVoyageTeam: VoyageTeamMember | undefined;
  let sprintsData: Sprint[] = [];

  // TODO: replace with a reusable function
  const [user, error] = await getUser();

  if (user) {
    currentVoyageTeam = user.voyageTeamMembers.find(
      (voyage) => voyage.voyageTeam.voyage.status.name === "Active",
    );
  }

  if (error) {
    return `Error: ${error?.message}`;
  }

  if (teamId === currentVoyageTeam?.voyageTeamId) {
    const [res, error] = await fetchSprints({ teamId });

    if (res) {
      sprintsData = res.voyage.sprints;
    } else {
      return `Error: ${error?.message}`;
    }
  } else {
    redirect("/");
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
        <EmptySprintState />
        <EmptySprintProvider
          sprints={sprintsData}
          currentSprintNumber={currentSprintNumber}
        />
      </>
    );
  }
}
