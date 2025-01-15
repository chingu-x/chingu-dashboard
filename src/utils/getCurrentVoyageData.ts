import { getCurrentVoyageTeam } from "./getCurrentVoyageTeam";
import { type User } from "@/modules/user/application/types";
import { type AppError } from "@/types/types";
import { type AsyncActionResponse } from "@/utils/handleAsync";

interface GetCurrentVoyageDataProps<X, Y> {
  teamId: number;
  func: (args: Y) => Promise<AsyncActionResponse<X>>;
  args: Y;
  user: User | null;
  error: AppError | null;
}

interface GetCurrentVoyageDataResponse<X> {
  errorResponse: string;
  data: AsyncActionResponse<X> | null;
}

export async function getCurrentVoyageData<X, Y>({
  teamId,
  func,
  args,
  user,
  error,
}: GetCurrentVoyageDataProps<X, Y>): Promise<GetCurrentVoyageDataResponse<X>> {
  let errorResponse = "";
  let data: AsyncActionResponse<X> | null = null;

  const { err, currentTeam } = getCurrentVoyageTeam({
    teamId,
    user,
    error,
  });

  if (err) {
    errorResponse = err;
  }

  if (currentTeam) {
    data = await func({ ...args });
  }

  return {
    errorResponse,
    data,
  };
}
