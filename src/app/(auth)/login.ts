/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from "@/utils/axiosInstance";

export async function login(email: string, password: string) {
  try {
    const response = await axiosInstance.post("/api/v1/auth/login", {
      email,
      password,
    });

    return response.data;
  } catch (error: any) {
    throw Error(error);
  }
}
