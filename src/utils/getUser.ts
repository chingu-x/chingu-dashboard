import { getAccessToken } from "./getCookie";
import { handleAsync } from "./handleAsync";
import { GET } from "./requests";
import { type AsyncActionResponse } from "@/modules/shared/types";
import { type User } from "@/store/features/user/userSlice";

export function getUser(): Promise<AsyncActionResponse<User>> {
  const token = getAccessToken();

  const getUserAsync = () =>
    GET<User>("api/v1/users/me", token, "force-cache", "me");

  return handleAsync(getUserAsync);
}
