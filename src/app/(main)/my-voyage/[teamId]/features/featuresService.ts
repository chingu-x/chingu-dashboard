"use server";

import { revalidateTag } from "next/cache";
import { Features } from "@/store/features/features/featuresSlice";
import { CacheTag } from "@/utils/cacheTag";
import { getAccessToken } from "@/utils/getCookie";
import { AsyncActionResponse, handleAsync } from "@/utils/handleAsync";
import { PATCH } from "@/utils/requests";

interface SaveOrderProps {
  featureId: number;
  order: number;
  featureCategoryId: number;
}

type SaveOrderBody = Pick<SaveOrderProps, "order" | "featureCategoryId">;

export async function saveOrder({
  featureId,
  order,
  featureCategoryId,
}: SaveOrderProps): Promise<AsyncActionResponse<Features>> {
  const token = getAccessToken();

  const saveOrderAsync = () =>
    PATCH<SaveOrderBody, Features>(
      `api/v1/voyages/features/${featureId}/reorde`,
      token,
      "default",
      { order, featureCategoryId }
    );

  const [res, error] = await handleAsync(saveOrderAsync);

  if (res) {
    revalidateTag(CacheTag.features);
  }

  return [res, error];
}
