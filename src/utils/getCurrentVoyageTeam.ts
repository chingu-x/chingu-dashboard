import { type AppError } from "@/types/types";
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

  if (user) {
    const requestedVoyageTeam = user.voyageTeamMembers.find(
      (voyage) => voyage.voyageTeamId === teamId,
    );

    if (
      requestedVoyageTeam &&
      requestedVoyageTeam.voyageTeam.voyage.status.name === "Active"
    ) {
      currentVoyageTeam = requestedVoyageTeam;
    } else {
      currentVoyageTeam = user.voyageTeamMembers.find(
        (voyage) => voyage.voyageTeam.voyage.status.name === "Active",
      );
    }
  }

  if (error) {
    err = `Error: ${error?.message}`;
  }

  if (currentVoyageTeam) {
    voyageTeamMemberId = currentVoyageTeam.id;
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
  };
}
