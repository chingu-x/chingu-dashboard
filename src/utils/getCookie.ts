// TODO: remove when architecture refactor is finished

import { cookies } from "next/headers";

export function getAccessToken() {
  const token = cookies().get("access_token")?.value || "";

  return token ? `access_token=${token}` : token;
}

export function getRefreshToken() {
  const token = cookies().get("refresh_token")?.value;

  return token ? `refresh_token=${token}` : token;
}
