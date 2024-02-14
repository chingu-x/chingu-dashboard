import { getAccessToken } from "./getCookie";
import { AsyncActionResponse, handleAsync } from "./handleAsync";
import { GET } from "./requests";
import { User } from "@/store/features/user/userSlice";

export function getUser(): Promise<AsyncActionResponse<User>> {
  const token = getAccessToken();

  const getUserAsync = () => GET<User>("api/v1/users/me", token, "no-store");

  return handleAsync(getUserAsync);
}
