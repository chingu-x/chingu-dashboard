"use server";

import { revalidateTag } from "next/cache";
import { getAccessToken } from "@/utils/getCookie";
import { POST, DELETE } from "@/utils/requests";
import { AsyncActionResponse, handleAsync } from "@/utils/handleAsync";
import { CacheTag } from "@/utils/cacheTag";

interface ResourceProps {
  teamId: number;
}

interface ResourceBody {
  url: string;
  title: string;
}

interface ResourceResponse {
  id: number;
  teamMemberId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface AddResourceProps extends ResourceProps, ResourceBody {}
export interface AddResourceResponse extends ResourceResponse {
  url: string;
  title: string;
}
export interface DeleteResourceProps {
  resourceId: number;
}
export interface DeleteResourceResponse extends AddResourceResponse {}

export async function addResource({
  teamId,
  title,
  url,
}: AddResourceProps): Promise<AsyncActionResponse<AddResourceResponse>> {
  const token = getAccessToken();
  const addResourceAsync = () =>
    POST<ResourceBody, AddResourceResponse>(
      `api/v1/voyages/teams/${teamId}`,
      token,
      "default",
      { url, title }
    );

  const [res, error] = await handleAsync(addResourceAsync);

  if (res) {
    revalidateTag(CacheTag.resources);
  }

  return [res, error];
}

export async function deleteResource({
  resourceId,
}: DeleteResourceProps): Promise<AsyncActionResponse<AddResourceResponse>> {
  const token = getAccessToken();
  const deleteResourceAsync = () =>
    DELETE<AddResourceResponse>(
      `api/v1/voyages/resources/${resourceId}`,
      token,
      "default"
    );

  const [res, error] = await handleAsync(deleteResourceAsync);

  if (res) {
    revalidateTag(CacheTag.resources);
  }

  return [res, error];
}
