import ProgressStepper from "./ProgressStepper";
import MeetingOverview from "./meetingOverview/MeetingOverview";

// import { mockMeetingData } from "./fixtures/Meeting";
// import { mockSprintsData } from "./fixtures/Sprints";

import { fetchSprints } from "./SprintsRedirectWrapper";
import SprintActions from "./SprintActions";
import MeetingProvider from "@/sprints/providers/MeetingProvider";
import Banner from "@/components/banner/Banner";
import VoyagePageBannerContainer from "@/components/banner/VoyagePageBannerContainer";

import { Meeting, Sprint } from "@/store/features/sprint/sprintSlice";
import getCurrentSprint from "@/utils/getCurrentSprint";
import {
  FetchMeetingProps,
  FetchMeetingResponse,
} from "@/sprints/sprintsService";
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
  let sprintsData: Sprint[] = [];
  let meetingData: Meeting = { id: +params.meetingId };

  const teamId = +params.teamId;
  const meetingId = +params.meetingId;

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
  const { number } = getCurrentSprint(sprintsData);
  const currentSprintNumber = number;

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
    </div>
  );
}
