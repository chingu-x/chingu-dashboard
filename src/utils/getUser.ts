/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { axiosInstance } from "./axiosInstance";

export async function getUser() {
  try {
    const response = await axiosInstance.get("/api/v1/users/me");

    return response.data;
  } catch (error: any) {
    throw Error(error);
  }

  // const getUserAsync = () =>
  //   GET<User>("api/v1/users/me", token, "force-cache", "me");

  // return handleAsync(getUserAsync);
}
