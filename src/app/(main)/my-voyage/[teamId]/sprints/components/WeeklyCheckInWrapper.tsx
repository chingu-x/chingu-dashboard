import { redirect } from "next/navigation";

import WeeklyCheckInForm from "./forms/WeeklyCheckIn/WeeklyCheckInForm";
import { getAccessToken } from "@/utils/getCookie";
import { getUser } from "@/utils/getUser";
import { GET } from "@/utils/requests";
import { CacheTag } from "@/utils/cacheTag";
import { AsyncActionResponse, handleAsync } from "@/utils/handleAsync";
import { getCurrentVoyageData } from "@/utils/getCurrentVoyageData";
import routePaths from "@/utils/routePaths";
import { Forms } from "@/utils/formsEnums";

// TODO: move interfaces and even fetchFormQuestions to some other place (file)
export interface Question {
  id: number;
  order: number;
  inputType: { id: number; name: string };
  text: string;
  description: string | null;
  answerRequired: boolean;
  multipleAllowed: boolean | null;
  optionGroup: {
    optionChoices: { id: number; text: string }[];
  } | null;
  // subQuestions: []; TODO: not sure how should it look like, no example for now
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
      CacheTag.checkInForm,
    );

  return await handleAsync(fetchSprintsAsync);
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
  let description = "";
  let questions = [] as Question[];

  const [user, error] = await getUser();

  const { errorResponse, data } = await getCurrentVoyageData({
    user,
    error,
    teamId,
    args: { formId: Forms.checkIn },
    func: fetchFormQuestions,
  });

  if (errorResponse) {
    return errorResponse;
  }

  if (data) {
    const [res, error] = data;

    if (res?.description) description = res?.description;
    if (res?.questions) questions = res?.questions;

    if (error) {
      return `Error: ${error.message}`;
    }
  } else {
    redirect(routePaths.dashboardPage());
  }

  return (
    <WeeklyCheckInForm
      params={params}
      description={description}
      questions={questions}
    />
  );
}
