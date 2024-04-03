import { AsyncActionResponse } from "./handleAsync";
import { getCurrentVoyageTeam } from "./getCurrentVoyageTeam";

interface GetCurrentVoyageDataProps<X, Y> {
  teamId: number;
  func: (args: Y) => Promise<AsyncActionResponse<X>>;
  args: Y;
}

interface GetCurrentVoyageDataResponse<X> {
  errorResponse: string;
  data: AsyncActionResponse<X> | null;
}

export async function getCurrentVoyageData<X, Y>({
  teamId,
  func,
  args,
}: GetCurrentVoyageDataProps<X, Y>): Promise<GetCurrentVoyageDataResponse<X>> {
  let errorResponse = "";
  let data: AsyncActionResponse<X> | null = null;

  const { error, currentTeam } = await getCurrentVoyageTeam({ teamId });

  if (error) {
    errorResponse = error;
  }

  if (currentTeam) {
    data = await func({ ...args });
  }

  return {
    errorResponse,
    data,
  };
}
