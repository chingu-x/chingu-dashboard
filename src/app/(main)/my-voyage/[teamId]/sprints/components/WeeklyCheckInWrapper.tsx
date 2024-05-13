import { redirect } from "next/navigation";

import WeeklyCheckInForm from "./forms/WeeklyCheckIn/WeeklyCheckInForm";

import { fetchTeamDirectory } from "@/myVoyage/directory/components/DirectoryComponentWrapper";
import { getAccessToken } from "@/utils/getCookie";
import { getUser } from "@/utils/getUser";
import { GET } from "@/utils/requests";
import { CacheTag } from "@/utils/cacheTag";
import { type AsyncActionResponse, handleAsync } from "@/utils/handleAsync";
import { getCurrentVoyageData } from "@/utils/getCurrentVoyageData";
import routePaths from "@/utils/routePaths";
import { Forms } from "@/utils/formsEnums";

// TODO: move interfaces and even fetchFormQuestions to some other place (file)
type InputType =
  | "radio"
  | "radioGroup"
  | "radioIcon"
  | "checkbox"
  | "boolean"
  | "teamMembersCheckbox"
  | "text"
  | "shortText"
  | "url"
  | "scale";

export interface Question {
  id: number;
  order: number;
  inputType: { id: number; name: InputType };
  text: string;
  description: string | null;
  answerRequired: boolean;
  multipleAllowed: boolean | null;
  optionGroup: {
    optionChoices: { id: number; text: string }[];
  } | null;
  subQuestions: {
    id: number;
    order: number;
    inputType: { id: number; name: InputType };
    text: string;
    description: string | null;
    answerRequired: boolean;
    multipleAllowed: boolean | null;
    optionGroup: {
      optionChoices: { id: number; text: string }[];
    } | null;
  }[];
}

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
  const token = getAccessToken();
  const fetchSprintsAsync = () =>
    GET<FetchFormQuestionsResponse>(
      `api/v1/forms/${formId}`,
      token,
      "force-cache",
      CacheTag.checkInForm
    );

  return await handleAsync(fetchSprintsAsync);
}

export interface TeamMemberForCheckbox {
  id: number;
  avatar: string;
  firstName: string;
  lastName: string;
}

interface WeeklyCheckInWrapperProps {
  params: {
    teamId: string;
    meetingId: string;
    sprintNumber: string;
  };
}

export default async function WeeklyCheckInWrapper({
  params,
}: WeeklyCheckInWrapperProps) {
  const teamId = Number(params.teamId);
  let teamMembers = [] as TeamMemberForCheckbox[];
  let description = "";
  let questions = [] as Question[];

  const [user, error] = await getUser();

  // TODO: chech if already submitted

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
    const [res, error] = data;

    if (error) {
      return `Error: ${error.message}`;
    }
    if (res) {
      teamMembers = res.voyageTeamMembers.map((member) => ({
        id: member.id,
        avatar: member.member.avatar,
        firstName: member.member.firstName,
        lastName: member.member.lastName,
      }));
    }

    const [formrRes, formError] = await fetchFormQuestions({
      formId: Forms.checkIn,
    });

    if (formError) {
      return `Error: ${formError.message}`;
    }
    if (formrRes && formrRes?.description) description = formrRes.description;
    if (formrRes && formrRes?.questions) questions = formrRes.questions;
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
