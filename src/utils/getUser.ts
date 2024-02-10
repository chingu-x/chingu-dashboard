import { getCookie } from "./getCookie";
import { GET } from "./requests";
import { User } from "@/store/features/user/userSlice";

export async function getUser(): Promise<User> {
  const token = getCookie();

  return await GET<User>("api/v1/users/me", token, "no-store");
}
