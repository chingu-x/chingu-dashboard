"use server";

import { revalidatePath } from "next/cache";
import { IdeationData } from "@/store/features/ideation/ideationSlice";
import { getCookie } from "@/utils/getCookie";
import { DELETE, GET, PATCH, POST } from "@/utils/requests";

interface IdeationProps {
  teamId: number;
  ideationId: number;
}

type AddIdeationType = Pick<IdeationProps, "teamId">;

export interface AddIdeationProps extends AddIdeationType, IdeationBody {}

interface IdeationBody {
  title: string;
  description: string;
  vision: string;
}

interface AddIdeationBody extends IdeationBody {}
interface EditIdeationBody extends Partial<AddIdeationBody> {}

export interface EditIdeationProps extends EditIdeationBody, IdeationProps {}

export interface IdeationVoteProps extends IdeationProps {}

export type FetchIdeationsProps = Pick<IdeationProps, "teamId">;

interface IdeationResponse {
  id: number;
  voyageTeamMemberId: number;
  createdAt: Date;
  updatedAt: Date;
}

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

export interface DeleteIdeationProps extends IdeationProps {}

export async function fetchProjectIdeas({
  teamId,
}: FetchIdeationsProps): Promise<IdeationData[]> {
  const token = getCookie();
  return await GET<IdeationData[]>(
    `api/v1/voyages/${teamId}/ideations`,
    token,
    "force-cache"
  );
}

export async function addIdeation({
  teamId,
  title,
  description,
  vision,
}: AddIdeationProps): Promise<AddIdeationResponse> {
  const token = getCookie();

  const data = await POST<AddIdeationBody, AddIdeationResponse>(
    `api/v1/voyages/${teamId}/ideations`,
    token,
    "default",
    { title, description, vision }
  );

  revalidatePath(`/my-voyage/${teamId}/ideation`);

  return data;
}

export async function editIdeation({
  teamId,
  ideationId,
  title,
  description,
  vision,
}: EditIdeationProps): Promise<EditIdeationResponse> {
  const token = getCookie();

  try {
    const data = await PATCH<EditIdeationBody, EditIdeationResponse>(
      `api/v1/voyages/${teamId}/ideations/${ideationId}`,
      token,
      "default",
      { title, description, vision }
    );

    revalidatePath(`/my-voyage/${teamId}/ideation`);

    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteIdeation({
  teamId,
  ideationId,
}: DeleteIdeationProps): Promise<DeleteIdeationResponse> {
  const token = getCookie();

  const data = await DELETE<DeleteIdeationResponse>(
    `api/v1/voyages/${teamId}/ideations/${ideationId}`,
    token,
    "default"
  );

  revalidatePath(`/my-voyage/${teamId}/ideation`);

  return data;
}

export async function addIdeationVote({
  teamId,
  ideationId,
}: IdeationVoteProps): Promise<IdeationVoteResponse> {
  const token = getCookie();

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
}: IdeationVoteProps) {
  const token = getCookie();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/voyages/${teamId}/ideations/${ideationId}/ideation-votes`,
    {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Cookie: `access_token=${token}`,
      },
      body: JSON.stringify({
        teamId,
        ideationId,
      }),
    }
  );

  revalidatePath(`/my-voyage/${teamId}/ideation`);

  return (await res.json()) as IdeationVoteResponse;
}
