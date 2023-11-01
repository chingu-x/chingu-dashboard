export async function getMembers(teamId: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/teams/${teamId}/members`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function updateHours({
  teamId,
  userId,
  newAvgHours,
}: {
  teamId: number;
  userId: string;
  newAvgHours: number;
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/teams/${teamId}/members/${userId}`,
    {
      method: "PATCH",
      body: JSON.stringify({ hrPerSprint: newAvgHours }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to update data");
  }

  return res.json();
}
