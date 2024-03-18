import { redirect } from "next/navigation";
import { getUser } from "./getUser";
import { AsyncActionResponse } from "./handleAsync";
import { VoyageTeamMember } from "@/store/features/user/userSlice";
import { AppError } from "@/types/types";

interface GetCurrentVoyageDataProps<X, Y> {
  teamId: number;
  func: (args: Y) => Promise<AsyncActionResponse<X>>;
  args: Y;
}

export async function getCurrentVoyageData<X, Y>({
  teamId,
  func,
  args,
}: GetCurrentVoyageDataProps<X, Y>): Promise<
  [X | null, AppError | null] | string
> {
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
    return await func({ ...args });
  } else {
    redirect("/");
  }
}
