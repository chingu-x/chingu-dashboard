import { redirect } from "next/navigation";

import ProgressStepper from "./ProgressStepper";
import MeetingOverview from "./meetingOverview/MeetingOverview";
import Agenda from "./agenda/Agenda";
import Sections from "./sections/Sections";
import { fetchSprints } from "./RedirectToCurrentSprintWrapper";
import SprintActions from "./SprintActions";
import MeetingProvider from "@/sprints/providers/MeetingProvider";

import {
  FetchMeetingProps,
  FetchMeetingResponse,
} from "@/sprints/sprintsService";
import { Meeting, Sprint } from "@/store/features/sprint/sprintSlice";

import { getCurrentSprint } from "@/utils/getCurrentSprint";
import { AsyncActionResponse, handleAsync } from "@/utils/handleAsync";
import { GET } from "@/utils/requests";
import { CacheTag } from "@/utils/cacheTag";
import { getAccessToken } from "@/utils/getCookie";
import { getUser } from "@/utils/getUser";
import { VoyageTeamMember } from "@/store/features/user/userSlice";

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
  const sprintNumber = Number(params.sprintNumber);
  const meetingId = Number(params.meetingId);

  let currentVoyageTeam: VoyageTeamMember | undefined;
  let sprintsData: Sprint[] = [];
  let meetingData: Meeting = { id: +params.meetingId };

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

    const correspondingMeetingId = sprintsData.find(
      (sprint) => sprint.number === sprintNumber,
    )?.teamMeetings[0]?.id;

    if (meetingId === correspondingMeetingId) {
      const [res, error] = await fetchMeeting({ meetingId });

      if (res) {
        meetingData = res;
      } else {
        return `Error: ${error?.message}`;
      }
    } else {
      redirect(`/my-voyage/${teamId}/sprints/`);
    }
  } else {
    redirect("/");
  }

  // Get current sprint number
  const { number } = getCurrentSprint(sprintsData) as Sprint;
  const currentSprintNumber = number;

  if (sprintNumber > currentSprintNumber) {
    redirect(`/my-voyage/${teamId}/sprints/${currentSprintNumber}/`);
  }

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
      <Agenda />
      <Sections />
    </>
  );
}
