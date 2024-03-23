import ProgressStepper from "./ProgressStepper";
import MeetingOverview from "./meetingOverview/MeetingOverview";
import { fetchSprints } from "./SprintsRedirectWrapper";
import SprintActions from "./SprintActions";
import MeetingProvider from "@/sprints/providers/MeetingProvider";

import {
  FetchMeetingProps,
  FetchMeetingResponse,
} from "@/sprints/sprintsService";
import { Meeting, Sprint } from "@/store/features/sprint/sprintSlice";

import getCurrentSprint from "@/utils/getCurrentSprint";
import { AsyncActionResponse, handleAsync } from "@/utils/handleAsync";
import { GET } from "@/utils/requests";
import { CacheTag } from "@/utils/cacheTag";
import { getAccessToken } from "@/utils/getCookie";

async function fetchMeeting({
  meetingId,
}: FetchMeetingProps): Promise<AsyncActionResponse<FetchMeetingResponse>> {
  const token = getAccessToken();

  const fetchMeetingAsync = () =>
    GET<FetchMeetingResponse>(
      `api/v1/voyages/sprints/meetings/${meetingId}`,
      token,
      "force-cache",
      CacheTag.sprint,
    );

  return await handleAsync(fetchMeetingAsync);
}

interface SprintWrapperProps {
  params: {
    teamId: string;
    sprintNumber: string;
    meetingId: string;
  };
}

export default async function SprintWrapper({ params }: SprintWrapperProps) {
  const teamId = Number(params.teamId);
  const meetingId = Number(params.meetingId);

  let sprintsData: Sprint[] = [];
  let meetingData: Meeting = { id: +params.meetingId };

  if (teamId) {
    const [res, error] = await fetchSprints({ teamId });

    if (res) {
      sprintsData = res.voyage.sprints;
    } else {
      return `Error: ${error?.message}`;
    }
  }

  if (meetingId) {
    const [res, error] = await fetchMeeting({ meetingId });

    if (res) {
      meetingData = res;
    } else {
      return `Error: ${error?.message}`;
    }
  }

  // Get current sprint number and current meeting id
  const { number } = getCurrentSprint(sprintsData) as Sprint;
  const currentSprintNumber = number;

  return (
    <>
      <ProgressStepper />
      <SprintActions
        teamId={params.teamId}
        meetingId={params.meetingId}
        sprintNumber={params.sprintNumber}
      />
      <MeetingOverview
        title={meetingData.title!}
        dateTime={meetingData.dateTime!}
        meetingLink={meetingData.meetingLink!}
        notes={meetingData.notes!}
      />
      <MeetingProvider
        sprints={sprintsData}
        meeting={meetingData}
        currentSprintNumber={currentSprintNumber}
      />
    </>
  );
}
