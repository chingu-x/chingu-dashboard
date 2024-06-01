import { redirect } from "next/navigation";

import WeeklyCheckInForm from "./forms/WeeklyCheckInForm";

import { fetchTeamDirectory } from "@/myVoyage/directory/components/DirectoryComponentWrapper";
import { getAccessToken } from "@/utils/getCookie";
import { getUser } from "@/utils/getUser";
import { GET } from "@/utils/requests";
import { CacheTag } from "@/utils/cacheTag";
import { type AsyncActionResponse, handleAsync } from "@/utils/handleAsync";
import { getCurrentVoyageData } from "@/utils/getCurrentVoyageData";
import routePaths from "@/utils/routePaths";
import { Forms } from "@/utils/form/formsEnums";
import { type Question, type TeamMemberForCheckbox } from "@/utils/form/types";
import { getSprintCheckinIsStatus } from "@/utils/getFormStatus";

interface FetchFormQuestionsProps {
  formId: number;
}

interface FetchFormQuestionsResponse {
  id: number;
  title: string;
  description: string;
  questions: Question[];
}

export async function fetchFormQuestions({
  formId,
}: FetchFormQuestionsProps): Promise<
  AsyncActionResponse<FetchFormQuestionsResponse>
> {
  let cache: CacheTag;

  if (formId === Number(Forms.checkIn)) {
    cache = CacheTag.checkInForm;
  } else if (formId === Number(Forms.submitProject)) {
    cache = CacheTag.submitVoyageForm;
  }

  const token = getAccessToken();
  const fetchSprintsAsync = () =>
    GET<FetchFormQuestionsResponse>(
      `api/v1/forms/${formId}`,
      token,
      "force-cache",
      cache,
    );

  return await handleAsync(fetchSprintsAsync);
}

interface WeeklyCheckInWrapperProps {
  params: {
    teamId: string;
    sprintNumber: string;
  };
}

export default async function WeeklyCheckInWrapper({
  params,
}: WeeklyCheckInWrapperProps) {
  const sprintNumber = Number(params.sprintNumber);
  const teamId = Number(params.teamId);

  let teamMembers = [] as TeamMemberForCheckbox[];

  let description = "";
  let questions = [] as Question[];

  const [user, error] = await getUser();

  const { errorResponse, data } = await getCurrentVoyageData({
    user,
    error,
    teamId,
    args: { teamId, user },
    func: fetchTeamDirectory,
  });

  if (errorResponse) {
    return errorResponse;
  }

  if (data) {
    // Check if a checkin form for the current sprint has been submitted
    const sprintCheckinIsSubmitted = getSprintCheckinIsStatus(
      user,
      sprintNumber,
    );

    if (sprintCheckinIsSubmitted) {
      redirect(
        routePaths.emptySprintPage(teamId.toString(), sprintNumber.toString()),
      );
    }

    const [res, error] = data;

    if (error) {
      return `Error: ${error.message}`;
    }
    if (res) {
      const voyageTeamMemberId = user?.voyageTeamMembers.find(
        (voyage) => voyage.voyageTeam.voyage.status.name == "Active",
      )?.id;

      // Get all teamMembers except for the current user
      teamMembers = res.voyageTeamMembers
        .map((member) => ({
          id: member.id,
          avatar: member.member.avatar,
          firstName: member.member.firstName,
          lastName: member.member.lastName,
        }))
        .filter((member) => member.id !== voyageTeamMemberId);
    }

    const [formRes, formError] = await fetchFormQuestions({
      formId: Forms.checkIn,
    });

    if (formError) {
      return `Error: ${formError.message}`;
    }
    if (formRes && formRes?.description) description = formRes.description;
    if (formRes && formRes?.questions) questions = formRes.questions;
  } else {
    redirect(routePaths.dashboardPage());
  }

  return (
    <WeeklyCheckInForm
      params={params}
      description={description}
      questions={questions}
      teamMembers={teamMembers}
    />
  );
}
