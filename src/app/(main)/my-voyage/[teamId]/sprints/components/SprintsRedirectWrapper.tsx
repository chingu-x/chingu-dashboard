import { redirect } from "next/navigation";

import { mockSprintsData } from "./fixtures/Sprints";
import { Sprint } from "@/store/features/sprint/sprintSlice";
import getCurrentSprint from "@/utils/getCurrentSprint";

interface SprintsRedirectWrapperProps {
  params: {
    teamId: string;
  };
}

export default function SprintsRedirectWrapper({
  params,
}: SprintsRedirectWrapperProps) {
  let sprints: Sprint[] = [];
  const teamId = +params.teamId;

  // const [res, error] = await fetchSprints({ teamId });

  // if (res) {
  //   sprintsData = res.voyage.sprints;
  //   // TODO: need to add logic to get current sprint number (compare dates)
  //   currentSprintNumber = 3;
  //   currentMeetingId = 3;
  // } else {
  //   return `Error: ${error?.message}`;
  // }

  sprints = mockSprintsData.map((sprint) => ({
    id: sprint.id,
    number: sprint.number,
    startDate: sprint.startDate,
    endDate: sprint.endDate,
    meetingData: { id: sprint.teamMeetings[0].meetingId },
  }));

  const { meetingData, number } = getCurrentSprint(sprints);
  const currentSprintNumber = number;
  const currentMeetingId = meetingData.id;

  if (teamId && currentMeetingId) {
    return redirect(
      `/my-voyage/${teamId}/sprints/${currentSprintNumber}/meeting/${currentMeetingId}`,
    );
  }

  return null;
}
