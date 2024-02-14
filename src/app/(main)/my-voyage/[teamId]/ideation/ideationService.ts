"use server";

// todo: refactor to use handleasync function

import { revalidatePath } from "next/cache";
import { getAccessToken } from "@/utils/getCookie";
import { DELETE, PATCH, POST } from "@/utils/requests";
import { AppError } from "@/types/types";

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
}: AddIdeationProps): Promise<AddIdeationResponse | AppError> {
  const token = getAccessToken();

  try {
    const data = await POST<AddIdeationBody, AddIdeationResponse>(
      `api/v1/voyages/${teamId}/ideations`,
      token,
      "default",
      { title, description, vision },
    );

    revalidatePath(`/my-voyage/${teamId}/ideation`);

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return error;
    } else {
      return { message: "Something went wrong" };
    }
  }
}

export async function editIdeation({
  teamId,
  ideationId,
  title,
  description,
  vision,
}: EditIdeationProps): Promise<EditIdeationResponse | AppError> {
  const token = getAccessToken();

  try {
    const data = await PATCH<EditIdeationBody, EditIdeationResponse>(
      `api/v1/voyages/${teamId}/ideations/${ideationId}`,
      token,
      "default",
      { title, description, vision },
    );

    revalidatePath(`/my-voyage/${teamId}/ideation`);

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { message: "Something went wrong" };
    }
  }
}

export async function deleteIdeation({
  teamId,
  ideationId,
}: DeleteIdeationProps): Promise<DeleteIdeationResponse | AppError> {
  const token = getAccessToken();

  try {
    const data = await DELETE<DeleteIdeationResponse>(
      `api/v1/voyages/${teamId}/ideations/${ideationId}`,
      token,
      "default",
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

export async function addIdeationVote({
  teamId,
  ideationId,
}: IdeationVoteProps): Promise<IdeationVoteResponse | AppError> {
  const token = getAccessToken();

  try {
    const data = await POST<undefined, IdeationVoteResponse>(
      `api/v1/voyages/${teamId}/ideations/${ideationId}/ideation-votes`,
      token,
      "default",
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

export async function removeIdeationVote({
  teamId,
  ideationId,
}: IdeationVoteProps): Promise<IdeationVoteResponse | AppError> {
  const token = getAccessToken();

  try {
    const data = await DELETE<IdeationVoteResponse>(
      `api/v1/voyages/${teamId}/ideations/${ideationId}/ideation-votes`,
      token,
      "default",
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
