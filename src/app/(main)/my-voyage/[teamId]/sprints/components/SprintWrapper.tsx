import { redirect } from "next/navigation";

import { Banner } from "@chingu-x/components/banner";
import Image from "next/image";
import { BannerContainer } from "@chingu-x/components/banner-container";
import ProgressStepper from "./ProgressStepper";
import MeetingOverview from "./meetingOverview/MeetingOverview";
import Agendas from "./agenda/Agendas";
import Sections from "./sections/Sections";
import { fetchSprints } from "./RedirectToCurrentSprintWrapper";
import SprintActions from "./SprintActions";
import MeetingProvider from "@/myVoyage/sprints/providers/MeetingProvider";

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
import { getCurrentVoyageTeam } from "@/utils/getCurrentVoyageTeam";
import { ErrorType } from "@/utils/error";
import ErrorComponent from "@/components/Error";

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
      sprintCache,
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

  // Check if it's a current team and if a project's been submitted,
  // redirect to /sprints page where a corresponding messsage is rendered
  const { currentTeam, projectSubmitted } = getCurrentVoyageTeam({
    teamId,
    user,
    error: null,
  });

  if (currentTeam && projectSubmitted) {
    redirect(`/my-voyage/${teamId}/sprints/`);
  }

  const { errorResponse, data } = await getCurrentVoyageData({
    user,
    error,
    teamId,
    args: { teamId },
    func: fetchSprints,
  });

  if (errorResponse) {
    return (
      <ErrorComponent
        errorType={ErrorType.FETCH_VOYAGE_DATA}
        message={errorResponse}
      />
    );
  }

  if (data) {
    const [res, error] = data;

    if (error) {
      return (
        <ErrorComponent
          errorType={ErrorType.FETCH_SPRINT}
          message={error.message}
        />
      );
    }
    voyageData = res!;
  } else {
    redirect(routePaths.dashboardPage());
  }

  const correspondingMeetingId = voyageData.sprints.find(
    (sprint) => sprint.number === sprintNumber,
  )?.teamMeetings[0];

  if (meetingId === correspondingMeetingId) {
    const [res, error] = await fetchMeeting({ sprintNumber, meetingId });

    if (res) {
      meetingData = res;
      agendaData = res.agendas;
      if (res.formResponseMeeting.length !== 0) {
        sectionsData = res.formResponseMeeting;
      }
    }

    if (error) {
      return (
        <ErrorComponent
          errorType={ErrorType.FETCH_MEETING}
          message={error.message}
        />
      );
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
    <div className="flex w-full flex-col gap-y-10">
      <BannerContainer
        title="Sprints"
        description="A sprint agenda helps the team stay on track, communicate well, and improve. Basically, it's like speed dating for developers. Except we're not looking for a soulmate, we're just trying to get some quality work done."
      >
        <Banner
          imageLight={
            <Image
              src="/img/sprints_banner_light.png"
              alt="Light sprints banner"
              fill={true}
              sizes="276px"
              priority
              style={{ objectFit: "contain" }}
            />
          }
          imageDark={
            <Image
              src="/img/sprints_banner_dark.png"
              alt="Dark sprints banner"
              fill={true}
              sizes="276px"
              priority
              style={{ objectFit: "contain" }}
            />
          }
          height="h-[200px]"
          width="w-[276px]"
        />
      </BannerContainer>

      <ProgressStepper currentSprintNumber={currentSprintNumber} />
      <SprintActions
        params={params}
        sprintCheckinIsSubmitted={sprintCheckinIsSubmitted}
        voyageProjectIsSubmitted={voyageProjectIsSubmitted}
        currentSprintNumber={currentSprintNumber}
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
          (section) => section.form.id === Number(Forms.planning),
        )}
        review={sectionsData.find(
          (section) => section.form.id === Number(Forms.review),
        )}
      />
    </div>
  );
}
