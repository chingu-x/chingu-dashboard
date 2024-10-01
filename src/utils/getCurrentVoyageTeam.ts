import { type AppError } from "@/modules/shared/types";
import {
  type User,
  type VoyageTeamMember,
} from "@/store/features/user/userSlice";

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
