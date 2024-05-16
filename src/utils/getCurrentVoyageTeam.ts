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

  if (user) {
    currentVoyageTeam = user.voyageTeamMembers.find(
      (voyage) => voyage.voyageTeam.voyage.status.name === "Active",
    );
  }

  if (error) {
    err = `Error: ${error?.message}`;
  }

  if (teamId === currentVoyageTeam?.voyageTeamId) {
    currentTeam = true;
  }

  return {
    user,
    err,
    currentTeam,
  };
}
