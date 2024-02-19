export async function GET<T>(
  url: string,
  token: string,
  cache: RequestCache,
  tags?: string,
): Promise<T> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, {
      headers: {
        Cookie: token,
      },
      cache,
      next: {
        tags: [tags ?? ""],
      },
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
  payload?: X,
): Promise<Y> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: token,
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
  payload: X,
): Promise<Y> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: token,
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

export async function DELETE<X>(
  url: string,
  token: string,
  cache: RequestCache,
): Promise<X> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Cookie: token,
      },
      cache,
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return (await res.json()) as X;
  } catch (error) {
    throw error;
  }
}
