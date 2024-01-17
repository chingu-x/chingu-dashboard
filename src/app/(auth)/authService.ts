"use server";
import { cookies } from "next/headers";
import { User } from "@/store/features/user/userSlice";

export async function serverSignIn(): Promise<void> {
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
      },
    );

    await res.json();

    const cookie = res.headers.getSetCookie();
    const token = cookie[0].split("; ")[0].split("access_token=")[1];
    const maxAge = cookie[0].split("; ")[1].split("=")[1];

    cookies().set({
      name: "access_token",
      value: token,
      httpOnly: true,
      maxAge: +maxAge,
      path: "/",
      secure: true,
    });
  } catch (error) {}
}

export async function serverSignOut(): Promise<void> {
  try {
    return await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/logout`,
      {
        method: "POST",
      },
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
    },
  );

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return (await res.json()) as User;
}