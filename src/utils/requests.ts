"use server";

export async function GET(url: string, token: string) {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, {
    headers: {
      Cookie: `access_token=${token}`,
    },
  });
}
