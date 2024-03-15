import { addDays, isAfter, isBefore } from "date-fns";

// import { redirect } from "next/navigation";

// import { getAccessToken } from "@/utils/getCookie";
import { mockSprintsData } from "./fixtures/Sprints";
import SprintsProvider from "@/sprints/providers/SprintsProvider";
import { Sprint } from "@/store/features/sprint/sprintSlice";

function getCurrentSprint(sprints: Sprint[]) {
  const currentDate = addDays(new Date(), 1).toISOString();
  const currentSprintNumber = sprints.filter(
    (sprint) =>
      isAfter(currentDate, sprint.startDate) &&
      isBefore(currentDate, sprint.endDate),
  );
  return currentSprintNumber[0];
}

interface SprintsLoaderWrapperProps {
  params: {
    teamId: string;
  };
}

export default function SprintsLoaderWrapper({
  params,
}: SprintsLoaderWrapperProps) {
  let sprints: Sprint[] = [];
  // const cookie = getAccessToken();

  // if (!cookie) {
  //   redirect("/");
  // }
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

  const { meetingData } = getCurrentSprint(sprints);
  const currentMeetingId = meetingData.id;

  return <SprintsProvider teamId={teamId} meetingId={currentMeetingId} />;
}
