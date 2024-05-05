import { redirect } from "next/navigation";

import VoyageSubmissionForm from "./forms/VoyageSubmission/VoyageSubmissionForm";
import { getUser } from "@/utils/getUser";
import { getCurrentVoyageData } from "@/utils/getCurrentVoyageData";
import routePaths from "@/utils/routePaths";
import { Forms } from "@/utils/formsEnums";
import { Question, fetchFormQuestions } from "./WeeklyCheckInWrapper";

interface SubmitProjectWrapperProps {
  params: {
    teamId: string;
    meetingId: string;
    sprintNumber: string;
  };
}

export default async function WeeklyCheckInWrapper({
  params,
}: SubmitProjectWrapperProps) {
  const teamId = Number(params.teamId);
  let title = "";
  let description = "";
  let questions = [] as Question[];
  const [user, error] = await getUser();

  const { errorResponse, data } = await getCurrentVoyageData({
    user,
    error,
    teamId,
    args: { formId: Forms.submitProject },
    func: fetchFormQuestions,
  });

  if (errorResponse) {
    return errorResponse;
  }

  if (data) {
    const [res, error] = data;

    if (res?.title) title = res?.title;
    if (res?.description) description = res?.description;
    if (res?.questions) questions = res?.questions;

    if (error) {
      return `Error: ${error.message}`;
    }
  } else {
    redirect(routePaths.dashboardPage());
  }

  return (
    <VoyageSubmissionForm
      params={params}
      title={title}
      description={description}
      questions={questions}
    />
  );
}
