"use server";

import { revalidateTag } from "next/cache";
import { CacheTag } from "@/utils/cacheTag";
import { getAccessToken } from "@/utils/getCookie";
import { type AsyncActionResponse, handleAsync } from "@/utils/handleAsync";
import { DELETE, PATCH, POST } from "@/utils/requests";
import { type TechStackItem } from "@/store/features/techStack/techStackSlice";

interface AddTechItemProps {
  teamId: number;
  techName: string;
  techCategoryId: number;
  voyageTeamMemberId: number;
}

type AddTechItemBody = Omit<AddTechItemProps, "teamId">;

interface AddTechItemResponse {
  teamTechStackItemVotedId: number;
  teamTechId: number;
  teamMemberId: number;
  createdAt: Date;
  updatedAt: Date;
}

interface EditTechItemProps {
  techItemId: number;
  techName: string;
}

type EditTechItemBody = Omit<EditTechItemProps, "techItemId">;

interface EditTechItemResponse extends TechStackItem {
  voyageTeamMemberId: number;
  voyageTeamId: number;
}

export interface DeleteTechItemProps {
  techItemId: number;
}

interface AddTechItemVoteProps {
  techItemId: number;
}
interface TechItemVoteResponse {
  teamTechStackItemVotedId: number;
  teamTechId: number;
  teamMemberId: number;
  createdAt: Date;
  updatedAt: Date;
}
interface RemoveTechItemVoteProps {
  techItemId: number;
}

export async function addTechItem({
  teamId,
  techName,
  techCategoryId,
  voyageTeamMemberId,
}: AddTechItemProps): Promise<AsyncActionResponse<AddTechItemResponse>> {
  const token = getAccessToken();
  const addTechItemAsync = () =>
    POST<AddTechItemBody, AddTechItemResponse>(
      `api/v1/voyages/teams/${teamId}/techs`,
      token,
      "default",
      { techName, techCategoryId, voyageTeamMemberId },
    );

  const [res, error] = await handleAsync(addTechItemAsync);

  if (res) {
    revalidateTag(CacheTag.techStack);
  }

  return [res, error];
}

export async function editTechItem({
  techItemId,
  techName,
}: EditTechItemProps): Promise<AsyncActionResponse<EditTechItemResponse>> {
  const token = getAccessToken();
  const editTechItemAsync = () =>
    PATCH<EditTechItemBody, EditTechItemResponse>(
      `api/v1/voyages/techs/${techItemId}`,
      token,
      "default",
      { techName },
    );

  const [res, error] = await handleAsync(editTechItemAsync);

  if (res) {
    revalidateTag(CacheTag.techStack);
  }

  return [res, error];
}

export async function deleteTechItem({
  techItemId,
}: DeleteTechItemProps): Promise<AsyncActionResponse<void>> {
  const token = getAccessToken();

  const deleteTechItemAsync = () =>
    DELETE<void>(`api/v1/voyages/techs/${techItemId}`, token, "default");
  const [res, error] = await handleAsync(deleteTechItemAsync);

  if (res) {
    revalidateTag(CacheTag.techStack);
  }

  return [res, error];
}

//Voting
// add vote endpoint /api/v1/voyages/techs/{teamTechItemId}/vote
//remove vote endpoint /api/v1/voyages/techs/{teamTechItemId}/vote
export async function addTechItemVote({
  techItemId,
}: AddTechItemVoteProps): Promise<AsyncActionResponse<TechItemVoteResponse>> {
  const token = getAccessToken();

  const addTechItemVoteAsync = () =>
    POST<undefined, TechItemVoteResponse>(
      `api/v1/voyages/techs/${techItemId}/vote`,
      token,
      "default",
    );

  const [res, error] = await handleAsync(addTechItemVoteAsync);

  if (res) {
    revalidateTag(CacheTag.techStack);
  }

  return [res, error];
}

export async function removeTechItemVote({
  techItemId,
}: RemoveTechItemVoteProps): Promise<
  AsyncActionResponse<TechItemVoteResponse>
> {
  const token = getAccessToken();

  const removeTechItemVoteAsync = () =>
    DELETE<TechItemVoteResponse>(
      `api/v1/voyages/techs/${techItemId}/vote`,
      token,
      "default",
    );

  const [res, error] = await handleAsync(removeTechItemVoteAsync);

  if (res) {
    revalidateTag(CacheTag.techStack);
  }

  return [res, error];
}
