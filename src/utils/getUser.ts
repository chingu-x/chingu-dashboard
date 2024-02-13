import { getCookie } from "./getCookie";
import { handleAsync } from "./handleAsync";
import { GET } from "./requests";
import { User } from "@/store/features/user/userSlice";

export function getUser(): Promise<[User | null, Error | null]> {
  const token = getCookie();

  const getUserAsync = async () =>
    GET<User>("api/v1/users/me", token, "no-store");

  return handleAsync(getUserAsync);
}
