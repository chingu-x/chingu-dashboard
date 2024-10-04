import axios from "axios";
import { getAccessToken } from "./getCookie";
import { type AsyncActionResponse, handleAsync } from "./handleAsync";
import { GET } from "./requests";
import { type User } from "@/store/features/user/userSlice";
import { axiosInstance } from "./axiosInstance";

export async function getUser() {
  try {
    const response = await axiosInstance.get("/api/v1/users/me");

    return response.data;
  } catch (error) {
    throw Error(error);
  }

  // const getUserAsync = () =>
  //   GET<User>("api/v1/users/me", token, "force-cache", "me");

  // return handleAsync(getUserAsync);
}
