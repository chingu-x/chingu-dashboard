"use server";

import { revalidateTag } from "next/cache";
import { IdeationClientAdapter } from "./ideationClientAdapter";
import { getAccessToken } from "@/utils/getCookie";
import { DELETE, PATCH, POST } from "@/utils/requests";
import { handleAsync } from "@/utils/handleAsync";
import { type AsyncActionResponse } from "@/utils/handleAsync";
import { CacheTag } from "@/utils/cacheTag";
import { type AddIdeationResponseDto } from "@/modules/ideation/application/dtos/response.dto";
import { type AddIdeationRequestDto } from "@/modules/ideation/application/dtos/request.dto";

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

type IdeationWithoutTeamId = Omit<IdeationProps, "teamId">;

export interface AddIdeationProps extends AddIdeationType, IdeationBody {}
export type EditIdeationProps = EditIdeationBody & IdeationWithoutTeamId;
export type DeleteIdeationProps = IdeationWithoutTeamId;

export type IdeationVoteProps = IdeationWithoutTeamId;
export type FetchIdeationsProps = Pick<IdeationProps, "teamId">;

export interface FinalizeIdeationProps extends IdeationProps {}

export interface AddIdeationResponse extends IdeationResponse, IdeationBody {}
export interface EditIdeationResponse extends AddIdeationResponse {}
export interface DeleteIdeationResponse extends AddIdeationResponse {}
export interface FinalizeIdeationResponse
  extends IdeationResponse,
    IdeationBody {
  isSelected: boolean;
}

export interface IdeationVoteResponse extends IdeationResponse {
  projectIdeaId: number;
}

const addIdeationClientAdapter = new IdeationClientAdapter();

export async function addIdeation({
  teamId,
  title,
  description,
  vision,
}: AddIdeationRequestDto): Promise<
  AsyncActionResponse<AddIdeationResponseDto>
> {
  const token = getAccessToken();

  const addIdeationAsync = () =>
    addIdeationClientAdapter.addIdeation({
      teamId,
      title,
      description,
      vision,
      token,
      cache: "default",
    });

  const [res, error] = await handleAsync(addIdeationAsync);

  if (res) {
    revalidateTag(CacheTag.ideation);
  }

  return [res, error];
}

export async function editIdeation({
  ideationId,
  title,
  description,
  vision,
}: EditIdeationProps): Promise<AsyncActionResponse<EditIdeationResponse>> {
  const token = getAccessToken();

  const editIdeationAsync = () =>
    PATCH<EditIdeationBody, EditIdeationResponse>(
      `api/v1/voyages/ideations/${ideationId}`,
      token,
      "default",
      { title, description, vision },
    );

  const [res, error] = await handleAsync(editIdeationAsync);

  if (res) {
    revalidateTag(CacheTag.ideation);
  }

  return [res, error];
}

export async function deleteIdeation({
  ideationId,
}: DeleteIdeationProps): Promise<AsyncActionResponse<DeleteIdeationResponse>> {
  const token = getAccessToken();
  const deleteIdeationAsync = () =>
    DELETE<DeleteIdeationResponse>(
      `api/v1/voyages/ideations/${ideationId}`,
      token,
      "default",
    );

  const [res, error] = await handleAsync(deleteIdeationAsync);

  if (res) {
    revalidateTag(CacheTag.ideation);
  }

  return [res, error];
}

export async function addIdeationVote({
  ideationId,
}: IdeationVoteProps): Promise<AsyncActionResponse<IdeationVoteResponse>> {
  const token = getAccessToken();

  const addIdeationVoteAsync = () =>
    POST<undefined, IdeationVoteResponse>(
      `api/v1/voyages/ideations/${ideationId}/ideation-votes`,
      token,
      "default",
    );

  const [res, error] = await handleAsync(addIdeationVoteAsync);

  if (res) {
    revalidateTag(CacheTag.ideation);
  }

  return [res, error];
}

export async function removeIdeationVote({
  ideationId,
}: IdeationVoteProps): Promise<AsyncActionResponse<IdeationVoteResponse>> {
  const token = getAccessToken();

  const removeIdeationVoteAsync = () =>
    DELETE<IdeationVoteResponse>(
      `api/v1/voyages/ideations/${ideationId}/ideation-votes`,
      token,
      "default",
    );

  const [res, error] = await handleAsync(removeIdeationVoteAsync);

  if (res) {
    revalidateTag(CacheTag.ideation);
  }

  return [res, error];
}

export async function finalizeIdeation({
  teamId,
  ideationId,
}: FinalizeIdeationProps): Promise<
  AsyncActionResponse<FinalizeIdeationResponse>
> {
  const token = getAccessToken();

  const finalizeIdeationAsync = () =>
    POST<undefined, FinalizeIdeationResponse>(
      `api/v1/voyages/teams/${teamId}/ideations/${ideationId}/select`,
      token,
      "default",
    );

  const [res, error] = await handleAsync(finalizeIdeationAsync);

  if (res) {
    revalidateTag(CacheTag.ideation);
  }

  return [res, error];
}
