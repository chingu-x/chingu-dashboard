import { cookies } from "next/headers";

export function getAccessToken() {
  const token = cookies().get("access_token")?.value || "";

  return `access_token=${token}`;
}

export function getRefreshToken() {
  const token = cookies().get("refresh_token")?.value || "";

  return `refresh_token=${token}`;
}
