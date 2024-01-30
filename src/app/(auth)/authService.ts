"use server";

import { cookies } from "next/headers";
import { User } from "@/store/features/user/userSlice";

interface ServerSignInResponse {
  message: string;
}

export async function serverSignIn(): Promise<ServerSignInResponse> {
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
    console.log(error);
  }
}

export async function getUser(): Promise<User | undefined> {
  const token = cookies().get("access_token")?.value || "";

  if (!token) return;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/me`,
    {
      headers: {
        Cookie: `access_token=${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return (await res.json()) as User;
}
