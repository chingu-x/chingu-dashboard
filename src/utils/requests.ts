export async function GET<T>(
  url: string,
  token: string,
  cache: RequestCache | undefined
): Promise<T> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, {
    headers: {
      Cookie: `access_token=${token}`,
    },
    cache,
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return (await res.json()) as T;
}
