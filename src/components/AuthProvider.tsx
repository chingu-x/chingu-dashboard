"use client";

import { useEffect } from "react";
import { clientSignIn } from "@/store/features/auth/authSlice";
import { useAppDispatch } from "@/store/hooks";
import { getUser } from "@/app/(auth)/authService";

export default function AuthProvider() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getAuthStatus = async () => {
      try {
        const user = await getUser();
        if (user) {
          dispatch(clientSignIn());
        }
      } catch (error) {
        console.log(error);
      }
    };

    void getAuthStatus();
  }, [dispatch]);

  return null;
}
