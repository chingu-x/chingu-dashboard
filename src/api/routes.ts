import type {
  TechsResponse,
  PostTechBody,
  PostTechResponse,
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
    `${process.env.NEXT_PUBLIC_API_URL}techs/teams/${teamId}/tech/new`,
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
