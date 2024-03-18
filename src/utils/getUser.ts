import { getAccessToken } from "./getCookie";
import { AsyncActionResponse, handleAsync } from "./handleAsync";
import { GET } from "./requests";
import { User } from "@/store/features/user/userSlice";

export function getUser(): Promise<AsyncActionResponse<User>> {
  const token = getAccessToken();

  console.log("called");

  const getUserAsync = () =>
    GET<User>("api/v1/users/me", token, "force-cache", "me");

  return handleAsync(getUserAsync);
}
