// TODO: remove when architecture refactor is finished

import { type User } from "@/modules/user/application/types";
import { type VoyageTeamMember } from "@/modules/voyage-team/application/dtos/response.dto";
import { type AppError } from "@/types/types";

interface GetCurrentVoyageTeamProps {
  teamId: number;
  user: User | null;
  error: AppError | null;
}

export function getCurrentVoyageTeam({
  teamId,
  user,
  error,
}: GetCurrentVoyageTeamProps) {
  let currentVoyageTeam: VoyageTeamMember | undefined;
  let err = "";
  let currentTeam = false;
  let voyageTeamMemberId: number = 0;
  let projectSubmitted: boolean = false;

  if (user) {
    currentVoyageTeam = user.voyageTeamMembers.find(
      (voyage) => voyage.voyageTeam.voyage.status.name === "Active",
    );
  }

  if (error) {
    err = error?.message;
  }

  if (currentVoyageTeam) {
    voyageTeamMemberId = currentVoyageTeam.id;
    projectSubmitted = currentVoyageTeam.voyageTeam.projectSubmitted;
  }

  if (teamId === currentVoyageTeam?.voyageTeamId) {
    currentTeam = true;
  }

  const isStarted = user?.voyageTeamMembers.some(
    (member) => member.voyageTeam.voyage.status.name === "Active",
  );

  return {
    user,
    err,
    currentTeam,
    isStarted,
    voyageTeamMemberId,
    projectSubmitted,
  };
}
