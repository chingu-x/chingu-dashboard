"use server";

import { revalidateTag } from "next/cache";
import { Features } from "@/store/features/features/featuresSlice";
import { CacheTag } from "@/utils/cacheTag";
import { getAccessToken } from "@/utils/getCookie";
import { AsyncActionResponse, handleAsync } from "@/utils/handleAsync";
import { DELETE, PATCH, POST } from "@/utils/requests";

interface SaveOrderProps {
  featureId: number;
  order: number;
  featureCategoryId: number;
}

interface AddFeatureProps {
  teamId: number;
  description: string;
  featureCategoryId: number;
}

interface EditFeatureProps {
  featureId: number;
  teamMemberId: number;
  description: string;
}

export type DeleteFeatureProps = Pick<EditFeatureProps, "featureId">;

type SaveOrderBody = Omit<SaveOrderProps, "featureId">;
type AddFeatureBody = Omit<AddFeatureProps, "teamId">;
type EditFeatureBody = Omit<EditFeatureProps, "featureId">;

interface AddFeatureResponse {
  id: number;
  teamMemberId: number;
  featureCategoryId: number;
  description: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

interface EditFeatureResponse extends AddFeatureResponse {}

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
      `api/v1/voyages/teams/${teamId}/features`,
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

export async function editFeature({
  featureId,
  teamMemberId,
  description,
}: EditFeatureProps): Promise<AsyncActionResponse<EditFeatureResponse>> {
  const token = getAccessToken();

  const editFeatureAsync = () =>
    PATCH<EditFeatureBody, EditFeatureResponse>(
      `api/v1/voyages/features/${featureId}`,
      token,
      "default",
      { teamMemberId, description }
    );

  const [res, error] = await handleAsync(editFeatureAsync);

  if (res) {
    revalidateTag(CacheTag.features);
  }

  return [res, error];
}

export async function deleteFeature({
  featureId,
}: DeleteFeatureProps): Promise<AsyncActionResponse<void>> {
  const token = getAccessToken();

  const deleteFeatureAsync = () =>
    DELETE<void>(`api/v1/voyages/features/${featureId}`, token, "default");

  const [res, error] = await handleAsync(deleteFeatureAsync);

  if (res) {
    revalidateTag(CacheTag.features);
  }

  return [res, error];
}
