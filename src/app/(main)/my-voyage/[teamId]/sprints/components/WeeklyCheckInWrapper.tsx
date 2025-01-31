"use client";

import "reflect-metadata";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import type {
  FormQuestions,
  TeamMemberForCheckbox,
} from "@chingu-x/modules/forms";
import { useEffect, useState } from "react";
import type { Sprint } from "@chingu-x/modules/sprints";
import WeeklyCheckInForm from "./forms/WeeklyCheckInForm";
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

interface WeeklyCheckInWrapperProps {
  params: {
    teamId: string;
    sprintNumber: string;
  };
}

export default function WeeklyCheckInWrapper({
  params,
}: WeeklyCheckInWrapperProps) {
  const sprintNumber = Number(params.sprintNumber);
  const { teamId } = params;
  const sprints = useSprint();
  const user = useUser();
  const myTeam = useMyTeam();
  const router = useRouter();
  let teamMembers = [] as TeamMemberForCheckbox[];
  const voyageTeamMemberId = voyageTeamAdapter.getCurrentVoyageUserId(user);
  const [weeklyCheckinFormQuestions, setWeeklyCheckinFormQuestions] =
    useState<FormQuestions>();
  const [currentSprintNumber, setCurrentSprintNumber] = useState<number>();

  useCheckCurrentVoyageTeam({ user, teamId });

  useEffect(() => {
    if (sprints.sprints.length === 0 || myTeam.voyageTeamMembers.length === 0) {
      router.push(routePaths.sprintsPage(teamId));
    }
  }, [sprints, myTeam, teamId, router]);

  // Check if a user wants to submit a checkin form for the current sprint.
  useEffect(() => {
    if (sprints.sprints.length > 0) {
      const { number } = sprintsAdapter.getCurrentSprint({
        currentDate,
        sprints: sprints.sprints,
      }) as Sprint;

      setCurrentSprintNumber(number);
    }
  }, [sprints]);

  if (currentSprintNumber && currentSprintNumber !== sprintNumber) {
    router.push(`/my-voyage/${teamId}/sprints/${currentSprintNumber}/`);
  }

  // Check if a checkin form for the current sprint has been submitted.
  const sprintCheckinIsSubmitted = sprintsAdapter.getSprintCheckinStatus({
    user,
    sprintNum: sprintNumber,
  });

  if (sprintCheckinIsSubmitted) {
    router.push(
      routePaths.emptySprintPage(teamId.toString(), sprintNumber.toString()),
    );
  }

  const { isPending, isError, error, data } = useQuery({
    queryKey: [
      CacheTag.checkInForm,
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

    return await formsAdapter.getWeeklyCheckinForm({
      voyageTeamRoles,
      currentUserVoyageRole,
    });
  }

  useEffect(() => {
    if (data) {
      setWeeklyCheckinFormQuestions(data);
    }
  }, [data]);

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
    weeklyCheckinFormQuestions && (
      <WeeklyCheckInForm
        params={params}
        description={weeklyCheckinFormQuestions.description}
        questions={weeklyCheckinFormQuestions.questions}
        teamMembers={teamMembers}
      />
    )
  );
}
