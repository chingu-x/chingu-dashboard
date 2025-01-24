// TODO: remove when architecture refactor is finished

import { type User } from "@chingu-x/modules/user";
import { getAccessToken } from "./getCookie";
import { handleAsync } from "./handleAsync";
import { GET } from "./requests";
import { type AsyncActionResponse } from "@/utils/handleAsync";

export function getUser(): Promise<AsyncActionResponse<User>> {
  const token = getAccessToken();

  const getUserAsync = () =>
    GET<User>("api/v1/users/me", token, "force-cache", "me");

  return handleAsync(getUserAsync);
}
