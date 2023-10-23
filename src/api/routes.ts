export async function getMembers(teamId: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}teams/${teamId}/members`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getTechStack(teamId: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/techs/team/${teamId}`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
