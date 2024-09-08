import { redirect } from "next/navigation";

import { fetchSprints } from "./RedirectToCurrentSprintWrapper";
import WeeklyCheckInForm from "./forms/WeeklyCheckInForm";

import { fetchTeamDirectory } from "@/myVoyage/directory/components/DirectoryComponentWrapper";
import { type Sprint, type Voyage } from "@/store/features/sprint/sprintSlice";
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
import { getCurrentSprint } from "@/utils/getCurrentSprint";
import { getCurrentVoyageTeam } from "@/utils/getCurrentVoyageTeam";
import { ErrorType } from "@/utils/error";
import ErrorComponent from "@/components/Error";

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
  const fetchFormAsync = () =>
    GET<FetchFormQuestionsResponse>(
      `api/v1/forms/${formId}`,
      token,
      "force-cache",
      cache,
    );

  return await handleAsync(fetchFormAsync);
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

  let voyageData: Voyage;
  let teamMembers = [] as TeamMemberForCheckbox[];

  let description = "";
  let questions = [] as Question[];

  let hasProductOwner = false;
  let hasScrumMaster = false;

  const [user, error] = await getUser();

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

    // Check if a user wants to submit a checkin form for the current sprint.
    const { number } = getCurrentSprint(voyageData.sprints) as Sprint;
    const currentSprintNumber = number;

    if (currentSprintNumber !== sprintNumber) {
      redirect(`/my-voyage/${teamId}/sprints/${currentSprintNumber}/`);
    } else {
      // Check if a checkin form for the current sprint has been submitted.
      const sprintCheckinIsSubmitted = getSprintCheckinIsStatus(
        user,
        sprintNumber,
      );

      if (sprintCheckinIsSubmitted) {
        redirect(
          routePaths.emptySprintPage(
            teamId.toString(),
            sprintNumber.toString(),
          ),
        );
      }

      // Fetch teamDirectory
      const [res, error] = await fetchTeamDirectory({ teamId, user });
      if (res) {
        let voyageTeamMemberId: number | undefined;
        if (user && user.voyageTeamMembers) {
          voyageTeamMemberId = getCurrentVoyageTeam({
            teamId,
            user,
            error,
          }).voyageTeamMemberId;
        }

        // Check if a team has a product owner or a scrum muster
        hasScrumMaster = !!res.voyageTeamMembers.find(
          (member) => member.voyageRole.name === "Scrum Master",
        );

        hasProductOwner = !!res.voyageTeamMembers.find(
          (member) => member.voyageRole.name === "Product Owner",
        );

        // Get all teamMembers except for the current user
        if (voyageTeamMemberId) {
          teamMembers = res.voyageTeamMembers
            .map((member) => ({
              id: member.id,
              avatar: member.member.avatar,
              firstName: member.member.firstName,
              lastName: member.member.lastName,
            }))
            .filter((member) => member.id !== voyageTeamMemberId);
        }
      }

      if (error) {
        return (
          <ErrorComponent
            errorType={ErrorType.FETCH_TEAM_DIRECTORY}
            message={error.message}
          />
        );
      }

      // Fetch general checkin form
      const [formRes, formError] = await fetchFormQuestions({
        formId: Forms.checkIn,
      });

      if (formError) {
        return (
          <ErrorComponent
            errorType={ErrorType.FETCH_FORM_QUESTIONS}
            message={formError.message}
          />
        );
      }

      if (formRes && formRes?.description) description = formRes.description;
      if (formRes && formRes?.questions) questions = formRes.questions;

      // Fetch PO checkin questions (form)
      if (hasProductOwner) {
        const [POformRes, POformError] = await fetchFormQuestions({
          formId: Forms.checkinPO,
        });

        if (POformError) {
          return (
            <ErrorComponent
              errorType={ErrorType.FETCH_FORM_QUESTIONS}
              message={POformError.message}
            />
          );
        }

        if (POformRes && POformRes?.questions)
          questions = [...questions, ...POformRes.questions];
      }

      // Fetch SM checkin questions (form)
      if (hasScrumMaster) {
        const [SMformRes, SMformError] = await fetchFormQuestions({
          formId: Forms.checkinSM,
        });

        if (SMformError) {
          return (
            <ErrorComponent
              errorType={ErrorType.FETCH_FORM_QUESTIONS}
              message={SMformError.message}
            />
          );
        }

        if (SMformRes && SMformRes?.questions)
          questions = [...questions, ...SMformRes.questions];
      }

      questions = questions.sort((a, b) => a.order - b.order);
    }
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
