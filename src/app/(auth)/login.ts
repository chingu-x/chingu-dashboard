import { axiosInstance } from "@/utils/axiosInstance";
import axios from "axios";

export async function login(email: string, password: string) {
  try {
    const response = await axiosInstance.post("/api/v1/auth/login", {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    throw Error(error);
  }
}
