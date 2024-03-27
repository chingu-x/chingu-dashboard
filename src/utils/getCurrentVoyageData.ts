import { AsyncActionResponse } from "./handleAsync";
import { AppError } from "@/types/types";
import { User, VoyageTeamMember } from "@/store/features/user/userSlice";

interface GetCurrentVoyageDataProps<X, Y> {
  user: User | null;
  error: AppError | null;
  teamId: number;
  func: (args: Y) => Promise<AsyncActionResponse<X>>;
  args: Y;
}

interface GetCurrentVoyageDataResponse<X> {
  errorResponse: string;
  data: AsyncActionResponse<X> | null;
}

export async function getCurrentVoyageData<X, Y>({
  user,
  error,
  teamId,
  func,
  args,
}: GetCurrentVoyageDataProps<X, Y>): Promise<GetCurrentVoyageDataResponse<X>> {
  let currentVoyageTeam: VoyageTeamMember | undefined;
  let errorResponse = "";
  let data: AsyncActionResponse<X> | null = null;

  if (user) {
    currentVoyageTeam = user.voyageTeamMembers.find(
      (voyage) => voyage.voyageTeam.voyage.status.name === "Active"
    );
  }

  if (error) {
    errorResponse = `Error: ${error?.message}`;
  }

  if (teamId === currentVoyageTeam?.voyageTeamId) {
    data = await func({ ...args });
  }

  return {
    errorResponse,
    data,
  };
}
