"use server";

import { revalidateTag } from "next/cache";
import { getAccessToken } from "@/utils/getCookie";
import { type AsyncActionResponse, handleAsync } from "@/utils/handleAsync";
import { PATCH } from "@/utils/requests";
import { CacheTag } from "@/utils/cacheTag";

interface EditHoursProps {
  teamId: number;
  hrPerSprint: number;
}

type EditHoursBody = Pick<EditHoursProps, "hrPerSprint">;

interface EditHoursResponse extends EditHoursBody {
  id: number;
  userId: string;
  voyageTeamId: number;
  voyageRoleId: number;
  statusId: number;
  createdAt: Date;
  updatedAt: Date;
}

export async function editHours({
  teamId,
  hrPerSprint,
}: EditHoursProps): Promise<AsyncActionResponse<EditHoursResponse>> {
  const token = getAccessToken();

  const editHoursAsync = () =>
    PATCH<EditHoursBody, EditHoursResponse>(
      `api/v1/teams/${teamId}/members`,
      token,
      "default",
      { hrPerSprint }
    );

  const [res, error] = await handleAsync(editHoursAsync);

  if (res) {
    revalidateTag(CacheTag.directory);
  }

  return [res, error];
}
