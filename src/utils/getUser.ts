import axios from "axios";
import { getAccessToken } from "./getCookie";
import { type AsyncActionResponse, handleAsync } from "./handleAsync";
import { GET } from "./requests";
import { type User } from "@/store/features/user/userSlice";

export async function getUser() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/me`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },
    );

    return response.data;
  } catch (error) {
    throw Error(error);
  }

  // const getUserAsync = () =>
  //   GET<User>("api/v1/users/me", token, "force-cache", "me");

  // return handleAsync(getUserAsync);
}
