"use server";

import { cookies } from "next/headers";
import { AsyncActionResponse, handleAsync } from "@/utils/handleAsync";
import { getAccessToken, getRefreshToken } from "@/utils/getCookie";
import { POST, UNAUTHPOST } from "@/utils/requests";

interface AuthResponse {
  message: string;
}

interface ServerSignInResponse extends AuthResponse {}

interface ServerSignOutResponse extends AuthResponse {}

interface ServerSignInProps {
  email: string;
  password: string;
}

interface ResetPasswordRequestProps {
  email?: string;
  token?: string;
  password?: string;
}

// prettier-ignore
// prettier causing issues here with eslint rules
export async function serverSignIn({ email, password }: ServerSignInProps ): Promise<
  AsyncActionResponse<ServerSignInResponse>
  > {
  const userOrError = async () => asyncSignIn(email, password);

  return handleAsync(userOrError);
}

// prettier-ignore
// prettier causing issues here with eslint rules
export async function serverSignOut(): Promise<
   AsyncActionResponse<ServerSignOutResponse>> {
  const accesstoken = getAccessToken();
  const refreshToken = getRefreshToken();
 

  const signOutSuccessOrFail = async () =>
    POST<undefined, ServerSignOutResponse>(
      "api/v1/auth/logout",
      `${accesstoken}; ${refreshToken}`,
      "default"
    );
    
    
  cookies().delete("access_token");
  cookies().delete("refresh_token");
    
  return handleAsync(signOutSuccessOrFail);
  
}

export async function resetPasswordRequestEmail(
  email: string,
): Promise<AsyncActionResponse<void>> {
  const asyncPasswordResetEmail = async () =>
    UNAUTHPOST<ResetPasswordRequestProps, void>(
      "api/v1/auth/reset-password/request",
      "no-store",
      {
        email,
      },
    );

  return handleAsync(asyncPasswordResetEmail);
}

export async function resetPassword({
  password,
  token,
}: ResetPasswordRequestProps): Promise<AsyncActionResponse<void>> {
  const asyncResetPassword = async () =>
    UNAUTHPOST<ResetPasswordRequestProps, void>(
      "api/v1/auth/reset-password",
      "no-store",
      {
        password,
        token,
      },
    );

  return handleAsync(asyncResetPassword);
}

/////////////////////////////////////////////////////////////////////////////

async function asyncSignIn(
  email: string,
  password: string,
): Promise<ServerSignInResponse> {
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
          email,
          password,
        }),
        credentials: "include",
        cache: "no-store",
      },
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
