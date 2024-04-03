"use server";

import { revalidateTag } from "next/cache";
import { getAccessToken } from "@/utils/getCookie";
import { DELETE, PATCH, POST } from "@/utils/requests";
import { AsyncActionResponse, handleAsync } from "@/utils/handleAsync";
import { CacheTag } from "@/utils/cacheTag";

interface IdeationProps {
  teamId: number;
  ideationId: number;
}

interface IdeationBody {
  title: string;
  description: string;
  vision: string;
}

type AddIdeationType = Pick<IdeationProps, "teamId">;

interface IdeationResponse {
  id: number;
  voyageTeamMemberId: number;
  createdAt: Date;
  updatedAt: Date;
}

interface AddIdeationBody extends IdeationBody {}
interface EditIdeationBody extends Partial<AddIdeationBody> {}

export interface AddIdeationProps extends AddIdeationType, IdeationBody {}
export interface EditIdeationProps extends EditIdeationBody, IdeationProps {}
export interface DeleteIdeationProps extends IdeationProps {}

export interface IdeationVoteProps extends IdeationProps {}
export type FetchIdeationsProps = Pick<IdeationProps, "teamId">;

export interface AddIdeationResponse extends IdeationResponse {
  title: string;
  description: string;
  vision: string;
}
export interface EditIdeationResponse extends AddIdeationResponse {}
export interface DeleteIdeationResponse extends AddIdeationResponse {}

export interface IdeationVoteResponse extends IdeationResponse {
  projectIdeaId: number;
}

export async function addIdeation({
  teamId,
  title,
  description,
  vision,
}: AddIdeationProps): Promise<AsyncActionResponse<AddIdeationResponse>> {
  const token = getAccessToken();

  const addIdeationAsync = () =>
    POST<AddIdeationBody, AddIdeationResponse>(
      `api/v1/voyages/teams/${teamId}/ideations`,
      token,
      "default",
      { title, description, vision }
    );

  const [res, error] = await handleAsync(addIdeationAsync);

  if (res) {
    revalidateTag(CacheTag.ideation);
  }

  return [res, error];
}

export async function editIdeation({
  teamId,
  ideationId,
  title,
  description,
  vision,
}: EditIdeationProps): Promise<AsyncActionResponse<EditIdeationResponse>> {
  const token = getAccessToken();

  const editIdeationAsync = () =>
    PATCH<EditIdeationBody, EditIdeationResponse>(
      `api/v1/voyages/teams/${teamId}/ideations/${ideationId}`,
      token,
      "default",
      { title, description, vision }
    );

  const [res, error] = await handleAsync(editIdeationAsync);

  if (res) {
    revalidateTag(CacheTag.ideation);
  }

  return [res, error];
}

export async function deleteIdeation({
  teamId,
  ideationId,
}: DeleteIdeationProps): Promise<AsyncActionResponse<DeleteIdeationResponse>> {
  const token = getAccessToken();
  const deleteIdeationAsync = () =>
    DELETE<DeleteIdeationResponse>(
      `api/v1/voyages/teams/${teamId}/ideations/${ideationId}`,
      token,
      "default"
    );

  const [res, error] = await handleAsync(deleteIdeationAsync);

  if (res) {
    revalidateTag(CacheTag.ideation);
  }

  return [res, error];
}

export async function addIdeationVote({
  teamId,
  ideationId,
}: IdeationVoteProps): Promise<AsyncActionResponse<IdeationVoteResponse>> {
  const token = getAccessToken();

  const addIdeationVoteAsync = () =>
    POST<undefined, IdeationVoteResponse>(
      `api/v1/voyages/teams/${teamId}/ideations/${ideationId}/ideation-votes`,
      token,
      "default"
    );

  const [res, error] = await handleAsync(addIdeationVoteAsync);

  if (res) {
    revalidateTag(CacheTag.ideation);
  }

  return [res, error];
}

export async function removeIdeationVote({
  teamId,
  ideationId,
}: IdeationVoteProps): Promise<AsyncActionResponse<IdeationVoteResponse>> {
  const token = getAccessToken();

  const removeIdeationVoteAsync = () =>
    DELETE<IdeationVoteResponse>(
      `api/v1/voyages/teams/${teamId}/ideations/${ideationId}/ideation-votes`,
      token,
      "default"
    );

  const [res, error] = await handleAsync(removeIdeationVoteAsync);

  if (res) {
    revalidateTag(CacheTag.ideation);
  }

  return [res, error];
}
