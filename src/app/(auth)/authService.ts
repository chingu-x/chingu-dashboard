"use server";

import { cookies } from "next/headers";
import { handleAsync } from "@/utils/handleAsync";
import { AppError } from "@/types/types";
import { getAccessToken, getRefreshToken } from "@/utils/getCookie";
import { POST } from "@/utils/requests";

interface AuthResponse {
  message: string;
}

interface ServerSignInResponse extends AuthResponse {}

interface ServerSignOutResponse extends AuthResponse {}

// prettier-ignore
// prettier causing issues here with eslint rules
export async function serverSignIn(): Promise<
  [ServerSignInResponse | null, AppError | null]
  > {
  const userOrError = async () => asyncSignIn();

  return handleAsync(userOrError);
}

// prettier-ignore
// prettier causing issues here with eslint rules
export async function serverSignOut(): Promise<
  [ServerSignOutResponse | null, AppError | null]> {
  const accesstoken = getAccessToken();
  const refreshToken = getRefreshToken();

  const signOutSuccessOrFail = async () =>
    POST<undefined, ServerSignOutResponse>(
      "api/v1/auth/logout",
      `${accesstoken}; ${refreshToken}`,
      "default"
    );

    
  const res = await handleAsync(signOutSuccessOrFail);
    
  cookies().delete("access_token");
  cookies().delete("refresh_token");

  return res;
}

/////////////////////////////////////////////////////////////////////////////

async function asyncSignIn(): Promise<ServerSignInResponse> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`,
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
    const refreshToken = res.headers
      .getSetCookie()[1]
      .split("refresh_token=")[1];
    const accessTokenValue = accessToken.split("; ")[0];
    const accessTokenMaxAge = accessToken.split("; ")[1].split("=")[1];
    const refreshTokenValue = refreshToken.split(";")[0];
    const refreshTokenMaxAge = refreshToken.split("; ")[1].split("=")[1];

    cookies().set({
      name: "access_token",
      value: accessTokenValue,
      httpOnly: true,
      maxAge: +accessTokenMaxAge,
      path: "/",
      secure: true,
    });

    cookies().set({
      name: "refresh_token",
      value: refreshTokenValue,
      httpOnly: true,
      maxAge: +refreshTokenMaxAge,
      path: "/",
      secure: true,
    });

    return (await res.json()) as ServerSignInResponse;
  } catch (error) {
    throw error;
  }
}
