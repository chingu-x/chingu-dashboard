import { redirect } from "next/navigation";

import { getAccessToken } from "@/utils/getCookie";
import { Sprint } from "@/store/features/sprint/sprintSlice";
import { fetchSprints } from "@/app/(main)/my-voyage/[teamId]/sprints/sprintsService";
import SprintsProvider from "@/app/(main)/my-voyage/[teamId]/sprints/providers/SprintsProvider";

interface SprintsLoaderWrapperProps {
  params: {
    teamId: string;
  };
}

export default async function SprintsLoaderWrapper({
  params,
}: SprintsLoaderWrapperProps) {
  let sprintsData: Sprint[] = [];
  let currentSprintNumber: number;
  let currentMeetingId: number;
  const cookie = getAccessToken();

  if (!cookie) {
    redirect("/");
  }
  const teamId = +params.teamId;

  const [res, error] = await fetchSprints({ teamId });

  if (res) {
    sprintsData = res.voyage.sprints;
    // TODO: need to add logic to get current sprint number (compare dates)
    currentSprintNumber = 3;
    currentMeetingId = 3;
  } else {
    return `Error: ${error?.message}`;
  }

  return (
    <SprintsProvider
      payload={sprintsData}
      teamId={teamId}
      currentSprintNumber={currentSprintNumber}
      meetingId={currentMeetingId}
    />
  );
}
