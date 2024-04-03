import { getUser } from "./getUser";
import { VoyageTeamMember } from "@/store/features/user/userSlice";

interface GetCurrentVoyageTeamProps {
  teamId: number;
}

export async function getCurrentVoyageTeam({
  teamId,
}: GetCurrentVoyageTeamProps) {
  let currentVoyageTeam: VoyageTeamMember | undefined;
  let error = "";
  let currentTeam = false;

  const [user, err] = await getUser();

  if (user) {
    currentVoyageTeam = user.voyageTeamMembers.find(
      (voyage) => voyage.voyageTeam.voyage.status.name === "Active"
    );
  }

  if (err) {
    error = `Error: ${err?.message}`;
  }

  if (teamId === currentVoyageTeam?.voyageTeamId) {
    currentTeam = true;
  }

  return {
    error,
    currentTeam,
  };
}
