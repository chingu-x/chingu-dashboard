"use server";

import { revalidatePath } from "next/cache";
import { IdeationData, ProjectIdeaVotes, fetchIdeations } from "@/store/features/ideation/ideationSlice";
import { store } from "@/store/store";

interface AddIdeationVoteProps {
  teamId: number;
  ideationId: number;
}

interface FetchIdeationsProps {
  teamId: number;
}

// export interface IdeationVoteResponse {
//   id: number;
//   voyageTeamMemberId: number;
//   projectIdeaId: number;
//   createdAt: Date;
//   updatedAt: Date;
// }

export async function fetchProjectIdeas({ teamId }: FetchIdeationsProps) {
  revalidatePath("/ideation");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/teams/${teamId}/ideations`,
  );

  const data = (await res.json()) as IdeationData[];

  store.dispatch(fetchIdeations(data));

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
          userId: "e7a6262d-c596-44ac-9a50-373bcff1e155",
        }),
      },
    );

    revalidatePath("/ideation");

    return (await res.json()) as ProjectIdeaVotes;
  } catch (error) {
    let message;

    if (error instanceof Error) message = error.message;
    else message = String(error);
    throw Error(message);
  }
}
