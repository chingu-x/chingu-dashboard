"use server";

import { revalidatePath } from "next/cache";
import { IdeationData } from "@/store/features/ideation/ideationSlice";
import { getCookie } from "@/utils/getCookie";
import { GET, PATCH, POST } from "@/utils/requests";

export interface AddIdeationProps extends AddIdeationBody {
  teamId: number;
}

interface AddIdeationBody {
  title: string;
  description: string;
  vision: string;
}

export interface EditIdeationProps extends EditIdeationBody {
  teamId: number;
  ideationId: number;
}

interface EditIdeationBody extends Partial<AddIdeationBody> {}

export interface IdeationVoteProps {
  teamId: number;
  ideationId: number;
}

export interface FetchIdeationsProps {
  teamId: number;
}

export interface AddIdeationResponse {
  id: number;
  voyageTeamMemberId: number;
  title: string;
  description: string;
  vision: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface EditIdeationResponse extends AddIdeationResponse {}

export interface IdeationVoteResponse {
  id: number;
  voyageTeamMemberId: number;
  projectIdeaId: number;
  createdAt: Date;
  updatedAt: Date;
}

export async function fetchProjectIdeas({
  teamId,
}: FetchIdeationsProps): Promise<IdeationData[]> {
  const token = getCookie();
  return await GET<IdeationData[]>(
    `api/v1/voyages/${teamId}/ideations`,
    token,
    "force-cache",
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
    { title, description, vision },
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

  const data = await PATCH<EditIdeationBody, EditIdeationResponse>(
    `api/v1/voyages/${teamId}/ideations/${ideationId}`,
    token,
    "default",
    { title, description, vision },
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
    "default",
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
    },
  );

  revalidatePath(`/my-voyage/${teamId}/ideation`);

  return (await res.json()) as IdeationVoteResponse;
}
