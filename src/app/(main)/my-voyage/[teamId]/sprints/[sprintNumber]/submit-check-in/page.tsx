"use client";

import "reflect-metadata";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import type { TeamMemberForCheckbox } from "@chingu-x/modules/forms";
import { useEffect } from "react";
import type { Sprint } from "@chingu-x/modules/sprints";
import { CacheTag } from "@/utils/cacheTag";
import routePaths from "@/utils/routePaths";
import { currentDate } from "@/utils/getCurrentSprint";
import { ErrorType } from "@/utils/error";
import ErrorComponent from "@/components/Error";
import { useMyTeam, useSprint, useUser } from "@/store/hooks";
import useCheckCurrentVoyageTeam from "@/hooks/useCheckCurrentVoyageTeam";
import {
  formsAdapter,
  sprintsAdapter,
  voyageTeamAdapter,
} from "@/utils/adapters";
import Spinner from "@/components/Spinner";
import WeeklyCheckInForm from "@/app/(main)/my-voyage/[teamId]/sprints/components/forms/WeeklyCheckInForm";

interface WeeklyCheckInPageProps {
  params: {
    teamId: string;
    sprintNumber: string;
  };
}

export default function WeeklyCheckInPage({ params }: WeeklyCheckInPageProps) {
  const sprintNumber = Number(params.sprintNumber);
  const { teamId } = params;
  const sprints = useSprint();
  const user = useUser();
  const myTeam = useMyTeam();
  const router = useRouter();
  let teamMembers = [] as TeamMemberForCheckbox[];
  const voyageTeamMemberId = voyageTeamAdapter.getCurrentVoyageUserId(user);

  useCheckCurrentVoyageTeam({ user, teamId });

  useEffect(() => {
    if (sprints.sprints.length === 0 || myTeam.voyageTeamMembers.length === 0) {
      router.push(routePaths.sprintsPage(teamId));
    }
  }, [sprints, myTeam, teamId, router]);

  // Check if a user wants to submit a checkin form for the current sprint.

  const { number, id } = sprintsAdapter.getCurrentSprint({
    currentDate,
    sprints: sprints.sprints,
  }) as Sprint;

  const currentSprintNumber = number;

  if (currentSprintNumber && currentSprintNumber !== sprintNumber) {
    router.push(`/my-voyage/${teamId}/sprints/${currentSprintNumber}/`);
  }

  // Check if a checkin form for the current sprint has been submitted.
  const sprintCheckinIsSubmitted = sprintsAdapter.getSprintCheckinStatus({
    user,
    sprintId: id,
  });

  if (sprintCheckinIsSubmitted) {
    router.push(
      routePaths.emptySprintPage(teamId.toString(), sprintNumber.toString()),
    );
  }

  const { isPending, isError, error, data } = useQuery({
    queryKey: [
      CacheTag.weeklyCheckInForm,
      { teamId, user: `${user.id}`, sprintNumber },
    ],
    queryFn: fetchWeeklyCheckinFormQuery,
  });

  async function fetchWeeklyCheckinFormQuery() {
    const voyageTeamRoles = voyageTeamAdapter.getVoyageMemberRoles({
      voyageTeam: myTeam,
    });

    const currentUserVoyageRole = voyageTeamAdapter.getCurrentUserVoyageRole({
      user,
      voyageTeam: myTeam,
    })!;

    return await formsAdapter.fetchWeeklyCheckinForm({
      voyageTeamRoles,
      currentUserVoyageRole,
    });
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

  // Get all teamMembers except for the current user
  if (voyageTeamMemberId) {
    teamMembers = myTeam.voyageTeamMembers
      .map((member) => ({
        id: member.id,
        avatar: member.member.avatar,
        firstName: member.member.firstName,
        lastName: member.member.lastName,
      }))
      .filter((member) => member.id !== voyageTeamMemberId);
  }

  return (
    <WeeklyCheckInForm
      params={params}
      description={data.description}
      questions={data.questions}
      teamMembers={teamMembers}
      sprintId={id}
    />
  );
}
