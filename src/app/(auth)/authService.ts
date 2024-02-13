"use server";

import { cookies } from "next/headers";
import { handleAsync } from "@/utils/handleAsync";
import { AppError } from "@/types/types";

interface ServerSignInResponse {
  message: string;
}

// prettier-ignore
// prettier causing issues here with eslint rules
export async function serverSignIn(): Promise<
  [ServerSignInResponse | null, AppError | null]
  > {
  const userOrError = async () => asyncSignIn();

  return handleAsync(userOrError);
}

export async function serverSignOut(): Promise<void> {
  try {
    return await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/logout`,
      {
        method: "POST",
      }
    ).then(() => {
      cookies().delete("access_token");
    });
  } catch (error) {
    throw error;
  }
}

async function asyncSignIn(): Promise<ServerSignInResponse> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/aut/login`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "jessica.williamson@gmail.com",
          password: "password",
        }),
        credentials: "include",
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const accessToken = res.headers.getSetCookie()[0].split("access_token=")[1];
    const tokenValue = accessToken.split("; ")[0];
    const maxAge = accessToken.split("; ")[1].split("=")[1];

    cookies().set({
      name: "access_token",
      value: tokenValue,
      httpOnly: true,
      maxAge: +maxAge,
      path: "/",
      secure: true,
    });

    return (await res.json()) as ServerSignInResponse;
  } catch (error) {
    throw error;
  }
}
