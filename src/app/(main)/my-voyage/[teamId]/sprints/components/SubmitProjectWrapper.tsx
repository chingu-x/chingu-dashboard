import { redirect } from "next/navigation";

import { fetchFormQuestions } from "./WeeklyCheckInWrapper";
import VoyageSubmissionForm from "./forms/VoyageSubmissionForm";

import { getUser } from "@/utils/getUser";
import { getCurrentVoyageData } from "@/utils/getCurrentVoyageData";
import routePaths from "@/utils/routePaths";
import { Forms } from "@/utils/form/formsEnums";
import { type Question } from "@/utils/form/types";
import { ErrorType } from "@/utils/error";

interface SubmitProjectWrapperProps {
  params: {
    teamId: string;
    sprintNumber: string;
  };
}

export default async function SubmitProjectWrapper({
  params,
}: SubmitProjectWrapperProps) {
  const teamId = Number(params.teamId);
  let title = "";
  let description = "";
  let questions = [] as Question[];

  const [user, error] = await getUser();

  // TODO: chech if already submitted

  const { errorResponse, data } = await getCurrentVoyageData({
    user,
    error,
    teamId,
    args: { formId: Forms.submitProject },
    func: fetchFormQuestions,
  });

  if (errorResponse) {
    return `${ErrorType.FORM_QUESTIONS} ${errorResponse}`;
  }

  if (data) {
    const [res, error] = data;

    if (res?.title) title = res?.title;
    if (res?.description) description = res?.description;
    if (res?.questions) questions = res?.questions;

    if (error) {
      return `${ErrorType.FORM_QUESTIONS} ${error.message}`;
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
