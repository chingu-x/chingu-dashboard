"use server";

import { revalidatePath } from "next/cache";
import { IdeationData } from "@/store/features/ideation/ideationSlice";

export interface FetchIdeationsProps {
  teamId: number;
}

interface AddIdeationVoteProps {
  teamId: number;
  ideationId: number;
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

export async function fetchProjectIdeas({ teamId }: FetchIdeationsProps) {
  revalidatePath("/ideation");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/teams/${teamId}/ideations`
  );

  const data = (await res.json()) as IdeationData[];

  return data;
}

export async function addIdeationVote({
  teamId,
  ideationId,
}: AddIdeationVoteProps) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/teams/${teamId}/ideations/${ideationId}/ideation-votes`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: "1bbd9ddb-f4b3-4e88-b2d8-fec82f653feb",
        }),
      }
    );

    revalidatePath("/ideation");

    return (await res.json()) as IdeationVoteResponse;
  } catch (error) {
    let message;

    if (error instanceof Error) message = error.message;
    else message = String(error);
    throw Error(message);
  }
}
