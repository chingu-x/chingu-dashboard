import { getUser } from "./getUser";
import { VoyageTeamMember } from "@/store/features/user/userSlice";

interface GetCurrentVoyageTeamProps {
  teamId: number;
}

export async function getCurrentVoyageTeam({
  teamId,
}: GetCurrentVoyageTeamProps) {
  let currentVoyageTeam: VoyageTeamMember | undefined;

  const [user, error] = await getUser();

  if (user) {
    currentVoyageTeam = user.voyageTeamMembers.find(
      (voyage) => voyage.voyageTeam.voyage.status.name === "Active"
    );
  }

  if (error) {
    return `Error: ${error?.message}`;
  }

  if (teamId === currentVoyageTeam?.voyageTeamId) {
    return true;
  }

  return false;
}
