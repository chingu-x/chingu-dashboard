import { cookies } from "next/headers";

export function getCookie() {
  return cookies().get("access_token")?.value || "";
}
