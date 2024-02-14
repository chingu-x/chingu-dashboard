export async function GET<T>(
  url: string,
  token: string,
  cache: RequestCache
): Promise<T> {
  try {
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
  } catch (error) {
    throw error;
  }
}

export async function POST<X, Y>(
  url: string,
  token: string,
  cache: RequestCache,
  payload?: X
): Promise<Y> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `access_token=${token}`,
      },
      body: JSON.stringify(payload),
      cache,
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return (await res.json()) as Y;
  } catch (error) {
    throw error;
  }
}

export async function PATCH<X, Y>(
  url: string,
  token: string,
  cache: RequestCache,
  payload: X
): Promise<Y> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Cookie: `access_token=${token}`,
    },
    body: JSON.stringify(payload),
    cache,
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return (await res.json()) as Y;
}

export async function DELETE<X>(
  url: string,
  token: string,
  cache: RequestCache
): Promise<X> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Cookie: `access_token=${token}`,
    },
    cache,
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return (await res.json()) as X;
}
