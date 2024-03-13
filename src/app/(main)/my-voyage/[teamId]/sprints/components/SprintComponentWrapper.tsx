import { redirect } from "next/navigation";

import MeetingOverview from "./MeetingOverview";
import { fetchMeeting } from "@/sprints/sprintsService";
import MeetingProvider from "@/sprints/providers/MeetingProvider";

import Banner from "@/components/banner/Banner";
import VoyagePageBannerContainer from "@/components/banner/VoyagePageBannerContainer";

import { Meeting } from "@/store/features/sprint/sprintSlice";
import { getAccessToken } from "@/utils/getCookie";

interface SprintComponentWrapperProps {
  params: {
    meetingId: string;
  };
}

export default async function SprintComponentWrapper({
  params,
}: SprintComponentWrapperProps) {
  let meetingData: Meeting;
  const cookie = getAccessToken();

  if (!cookie) {
    redirect("/");
  }

  const meetingId = +params.meetingId;

  const [res, error] = await fetchMeeting({ meetingId });

  if (res) {
    meetingData = res;
  } else {
    return `Error: ${error?.message}`;
  }

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
      <MeetingOverview />
      <MeetingProvider payload={meetingData} />
    </div>
  );
}
