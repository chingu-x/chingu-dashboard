"use server";

export async function GET<T>(url: string, token: string): Promise<T> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, {
    headers: {
      Cookie: `access_token=${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return (await res.json()) as T;
}
