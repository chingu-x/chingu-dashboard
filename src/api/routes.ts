import type {
  TechsResponse,
  PostTechBody,
  PostTechResponse,
  VoteTechResponse
} from "@/app/tech-stack/components/types/types";

export async function getTechStack(teamId: number): Promise<TechsResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}techs/teams/${teamId}`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = (await res.json()) as TechsResponse;

  return data;
}

export async function postNewTech(
  teamId: number,
  body: PostTechBody,
): Promise<PostTechResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}techs/teams/${teamId}/techs`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );

  if (!res.ok) {
    throw new Error("Failed to post data");
  }

  const data = (await res.json()) as PostTechResponse;

  return data;
}

export async function voteExistingTech(
  teamId: number,
  teamTechId: number,
  votedBy: string,
): Promise<VoteTechResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}techs/teams/${teamId}/techs/${teamTechId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ votedBy: votedBy }),
    },
  );

  if (!res.ok) {
    throw new Error("Failed to post data");
  }

  const data = (await res.json()) as VoteTechResponse;

  return data;
}

export async function removeVote(
  teamId: number,
  teamTechId: number,
  votedBy: string,
): Promise<VoteTechResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}techs/teams/${teamId}/techs/${teamTechId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ removedBy: votedBy }),
    },
  );

  if (!res.ok) {
    throw new Error("Failed to post data");
  }

  const data = (await res.json()) as VoteTechResponse;

  return data;
}
