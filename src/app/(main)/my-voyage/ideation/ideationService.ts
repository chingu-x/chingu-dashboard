"use server";

import { revalidatePath } from "next/cache";
import { IdeationData } from "@/store/features/ideation/ideationSlice";
import { getCookie } from "@/utils/getCookie";
import { GET } from "@/utils/requests";

interface AddIdeationVoteProps {
  teamId: number;
  ideationId: number;
}

export interface FetchIdeationsProps {
  teamId: number;
}

export interface IdeationVoteResponse {
  id: number;
  voyageTeamMemberId: number;
  projectIdeaId: number;
  createdAt: Date;
  updatedAt: Date;
  votedBy: {
    member: {
      avatar: string;
    };
  };
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

export async function addIdeationVote({
  teamId,
  ideationId,
}: AddIdeationVoteProps) {
  const token = getCookie();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/voyages/${teamId}/ideations/${ideationId}/ideation-votes`,
      {
        method: "POST",
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

    revalidatePath("/my-voyage/ideation");

    return (await res.json()) as IdeationVoteResponse;
  } catch (error) {
    let message;

    if (error instanceof Error) message = error.message;
    else message = String(error);
    throw Error(message);
  }
}
