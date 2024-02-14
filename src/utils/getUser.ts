import { getAccessToken } from "./getCookie";
import { handleAsync } from "./handleAsync";
import { GET } from "./requests";
import { AppError } from "@/types/types";
import { User } from "@/store/features/user/userSlice";

export function getUser(): Promise<[User | null, AppError | null]> {
  const token = getAccessToken();

  const getUserAsync = async () =>
    GET<User>("api/v1/users/me", token, "no-store");

  return handleAsync(getUserAsync);
}
