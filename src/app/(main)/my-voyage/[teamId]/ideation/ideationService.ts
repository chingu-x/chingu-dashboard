"use server";

// todo: refactor to use handleasync function

import { revalidatePath } from "next/cache";
import { getAccessToken } from "@/utils/getCookie";
import { DELETE, PATCH, POST } from "@/utils/requests";
import { AppError } from "@/types/types";
import { AsyncActionResponse, handleAsync } from "@/utils/handleAsync";

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
      `api/v1/voyages/${teamId}/ideations`,
      token,
      "default",
      { title, description, vision }
    );

  const [res, error] = await handleAsync(addIdeationAsync);

  if (res) {
    revalidatePath(`/my-voyage/${teamId}/ideation`);
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
      `api/v1/voyages/${teamId}/ideations/${ideationId}`,
      token,
      "default",
      { title, description, vision }
    );

  const [res, error] = await handleAsync(editIdeationAsync);

  if (res) {
    revalidatePath(`/my-voyage/${teamId}/ideation`);
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
      `api/v1/voyages/${teamId}/ideations/${ideationId}`,
      token,
      "default"
    );

  const [res, error] = await handleAsync(deleteIdeationAsync);

  if (res) {
    revalidatePath(`/my-voyage/${teamId}/ideation`);
  }

  return [res, error];
}

export async function addIdeationVote({
  teamId,
  ideationId,
}: IdeationVoteProps): Promise<AsyncActionResponse<IdeationVoteResponse>> {
  const token = getAccessToken();

  const data = await POST<undefined, IdeationVoteResponse>(
    `api/v1/voyages/${teamId}/ideations/${ideationId}/ideation-votes`,
    token,
    "default"
  );

  revalidatePath(`/my-voyage/${teamId}/ideation`);

  return data;
}

export async function removeIdeationVote({
  teamId,
  ideationId,
}: IdeationVoteProps): Promise<IdeationVoteResponse | AppError> {
  const token = getAccessToken();

  try {
    const data = await DELETE<IdeationVoteResponse>(
      `api/v1/voyages/${teamId}/ideations/${ideationId}/ideation-votes`,
      token,
      "default"
    );

    revalidatePath(`/my-voyage/${teamId}/ideation`);

    return data;
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: "Something went wrong" };
    }
  }
}
