"use client";

import "reflect-metadata";
import { useRouter } from "next/navigation";
import type { Sprint } from "@chingu-x/modules/sprints";
import { useQuery } from "@tanstack/react-query";
import VoyageSubmissionForm from "./forms/VoyageSubmissionForm";
import { ErrorType } from "@/utils/error";
import ErrorComponent from "@/components/Error";
import { useSprint, useUser } from "@/store/hooks";
import { formsAdapter, sprintsAdapter } from "@/utils/adapters";
import { currentDate } from "@/utils/getCurrentSprint";
import { CacheTag } from "@/utils/cacheTag";
import Spinner from "@/components/Spinner";
import useCheckCurrentVoyageTeam from "@/hooks/useCheckCurrentVoyageTeam";

interface SubmitProjectWrapperProps {
  params: {
    teamId: string;
    sprintNumber: string;
  };
}

export default function SubmitProjectWrapper({
  params,
}: SubmitProjectWrapperProps) {
  const { teamId } = params;
  const sprintNumber = Number(params.sprintNumber);
  const user = useUser();
  const sprints = useSprint();
  const router = useRouter();

  useCheckCurrentVoyageTeam({ user, teamId });

  const { number } = sprintsAdapter.getCurrentSprint({
    currentDate,
    sprints: sprints.sprints,
  }) as Sprint;

  const currentSprintNumber = number;

  if (currentSprintNumber && currentSprintNumber !== sprintNumber) {
    router.push(`/my-voyage/${teamId}/sprints/${currentSprintNumber}/`);
  }

  const { isPending, isError, error, data } = useQuery({
    queryKey: [CacheTag.submitVoyageForm, { teamId, user: `${user.id}` }],
    queryFn: fetchVoyageProjectSubmitFormQuery,
  });

  async function fetchVoyageProjectSubmitFormQuery() {
    return await formsAdapter.fetchSubmitVoyageProjectForm();
  }

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <ErrorComponent
        errorType={ErrorType.FETCH_FORM_QUESTIONS}
        message={error.message}
      />
    );
  }

  return (
    <VoyageSubmissionForm
      params={params}
      title={data.title}
      description={data.description}
      questions={data.questions}
    />
  );
}
