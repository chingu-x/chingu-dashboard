"use server";

import { revalidateTag } from "next/cache";
import { Features } from "@/store/features/features/featuresSlice";
import { CacheTag } from "@/utils/cacheTag";
import { getAccessToken } from "@/utils/getCookie";
import { AsyncActionResponse, handleAsync } from "@/utils/handleAsync";
import { PATCH, POST } from "@/utils/requests";

interface SaveOrderProps {
  featureId: number;
  order: number;
  featureCategoryId: number;
}

type SaveOrderBody = Omit<SaveOrderProps, "featureId">;

interface AddFeatureProps {
  teamId: number;
  description: string;
  featureCategoryId: number;
}

type AddFeatureBody = Omit<AddFeatureProps, "teamId">;

interface AddFeatureResponse {
  id: number;
  teamMemberId: number;
  featureCategoryId: number;
  description: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export async function saveOrder({
  featureId,
  order,
  featureCategoryId,
}: SaveOrderProps): Promise<AsyncActionResponse<Features>> {
  const token = getAccessToken();

  const saveOrderAsync = () =>
    PATCH<SaveOrderBody, Features>(
      `api/v1/voyages/features/${featureId}/reorder`,
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

export async function addFeature({
  teamId,
  description,
  featureCategoryId,
}: AddFeatureProps): Promise<AsyncActionResponse<AddFeatureResponse>> {
  const token = getAccessToken();

  const addFeatureAsync = () =>
    POST<AddFeatureBody, AddFeatureResponse>(
      `api/v1/voyages/teams/${teamId}/feature`,
      token,
      "default",
      { featureCategoryId, description }
    );

  const [res, error] = await handleAsync(addFeatureAsync);

  if (res) {
    revalidateTag(CacheTag.features);
  }

  return [res, error];
}
