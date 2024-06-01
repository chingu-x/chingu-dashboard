import { redirect } from "next/navigation";

import ProgressStepper from "./ProgressStepper";
import MeetingOverview from "./meetingOverview/MeetingOverview";
import Agendas from "./agenda/Agendas";
import Sections from "./sections/Sections";
import { fetchSprints } from "./RedirectToCurrentSprintWrapper";
import SprintActions from "./SprintActions";
import MeetingProvider from "@/myVoyage/sprints/providers/MeetingProvider";

import VoyagePageBannerContainer from "@/components/banner/VoyagePageBannerContainer";
import Banner from "@/components/banner/Banner";

import {
  type FetchMeetingProps,
  type FetchMeetingResponse,
} from "@/myVoyage/sprints/sprintsService";

import {
  type Agenda,
  type Meeting,
  type Sprint,
  type Section,
  type Voyage,
} from "@/store/features/sprint/sprintSlice";

import { getCurrentSprint } from "@/utils/getCurrentSprint";
import { type AsyncActionResponse, handleAsync } from "@/utils/handleAsync";
import { GET } from "@/utils/requests";
import { getAccessToken } from "@/utils/getCookie";
import { getUser } from "@/utils/getUser";
import { getSprintCache } from "@/utils/getSprintCache";
import { getCurrentVoyageData } from "@/utils/getCurrentVoyageData";
import routePaths from "@/utils/routePaths";
import { Forms } from "@/utils/form/formsEnums";
import {
  getSprintCheckinIsStatus,
  getVoyageProjectStatus,
} from "@/utils/getFormStatus";

export async function fetchMeeting({
  sprintNumber,
  meetingId,
}: FetchMeetingProps): Promise<AsyncActionResponse<FetchMeetingResponse>> {
  const token = getAccessToken();
  const sprintCache = getSprintCache(sprintNumber);
  const fetchMeetingAsync = () =>
    GET<FetchMeetingResponse>(
      `api/v1/voyages/sprints/meetings/${meetingId}`,
      token,
      "force-cache",
      sprintCache
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

  let voyageData: Voyage;
  let meetingData: Meeting = { id: +params.meetingId };
  let agendaData: Agenda[] = [];
  let sectionsData: Section[] = [];

  const [user, error] = await getUser();

  const { errorResponse, data } = await getCurrentVoyageData({
    user,
    error,
    teamId,
    args: { teamId },
    func: fetchSprints,
  });

  if (errorResponse) {
    return errorResponse;
  }

  if (data) {
    const [res, error] = data;

    if (error) {
      return `Error: ${error.message}`;
    }
    voyageData = res!;
  } else {
    redirect(routePaths.dashboardPage());
  }

  const correspondingMeetingId = voyageData.sprints.find(
    (sprint) => sprint.number === sprintNumber
  )?.teamMeetings[0]?.id;

  if (meetingId === correspondingMeetingId) {
    const [res, error] = await fetchMeeting({ sprintNumber, meetingId });

    if (res) {
      meetingData = res;
      agendaData = res.agendas;
      if (res.formResponseMeeting.length !== 0) {
        sectionsData = res.formResponseMeeting;
      }
    } else {
      return `Error: ${error?.message}`;
    }
  } else {
    redirect(`/my-voyage/${teamId}/sprints/`);
  }

  // Get current sprint number
  const { number } = getCurrentSprint(voyageData.sprints) as Sprint;
  const currentSprintNumber = number;

  // Redirect if a user tries to access a sprint which hasn't started yet
  if (sprintNumber > currentSprintNumber) {
    redirect(`/my-voyage/${teamId}/sprints/${currentSprintNumber}/`);
  }

  // Check if a checkin form for the current sprint has been submitted
  const sprintCheckinIsSubmitted = getSprintCheckinIsStatus(user, sprintNumber);

  // Check if a voyage project has been submitted
  const voyageProjectIsSubmitted = getVoyageProjectStatus(user, teamId);

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

      <ProgressStepper currentSprintNumber={currentSprintNumber} />
      <SprintActions
        params={params}
        sprintCheckinIsSubmitted={sprintCheckinIsSubmitted}
        voyageProjectIsSubmitted={voyageProjectIsSubmitted}
      />
      <MeetingOverview
        title={meetingData.title!}
        dateTime={meetingData.dateTime!}
        meetingLink={meetingData.meetingLink!}
        description={meetingData.description!}
      />
      <MeetingProvider voyage={voyageData} meeting={meetingData} />
      <Agendas params={params} topics={agendaData} />
      <Sections
        params={params}
        notes={meetingData.notes}
        planning={sectionsData.find(
          (section) => section.form.id === Number(Forms.planning)
        )}
        review={sectionsData.find(
          (section) => section.form.id === Number(Forms.review)
        )}
      />
    </div>
  );
}
