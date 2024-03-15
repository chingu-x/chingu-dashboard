import { addDays, isAfter, isBefore } from "date-fns";
// import { redirect } from "next/navigation";
// import { fetchMeeting } from "@/sprints/sprintsService";
// import { getAccessToken } from "@/utils/getCookie";
import ProgressStepper from "./ProgressStepper";
import MeetingOverview from "./MeetingOverview";

import { mockMeetingData } from "./fixtures/Meeting";
import { mockSprintsData } from "./fixtures/Sprints";

import MeetingProvider from "@/sprints/providers/MeetingProvider";
import Banner from "@/components/banner/Banner";
import VoyagePageBannerContainer from "@/components/banner/VoyagePageBannerContainer";

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

interface SprintComponentWrapperProps {
  params: {
    teamId: string;
    meetingId: string;
  };
}

export default function SprintComponentWrapper({
  params,
}: SprintComponentWrapperProps) {
  let sprints: Sprint[] = [];
  // const cookie = getAccessToken();

  // if (!cookie) {
  //   redirect("/");
  // }

  const meetingId = +params.meetingId;
  console.log(meetingId);

  // const [res, error] = await fetchMeeting({ meetingId });

  // if (res) {
  //   meetingData = res;
  // } else {
  //   return `Error: ${error?.message}`;
  // }

  // Get Sprints
  sprints = mockSprintsData.map((sprint) => ({
    id: sprint.id,
    number: sprint.number,
    startDate: sprint.startDate,
    endDate: sprint.endDate,
    meetingData: { id: sprint.teamMeetings[0].meetingId },
  }));

  // Get current sprint number and current meeting id
  const { number } = getCurrentSprint(sprints);
  const currentSprintNumber = number;
  const meeting = mockMeetingData;

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
      <MeetingOverview />
      <MeetingProvider
        sprints={sprints}
        meeting={meeting}
        currentSprintNumber={currentSprintNumber}
      />
    </div>
  );
}
