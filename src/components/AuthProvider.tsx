"use client";

import { useEffect } from "react";
import { getUser } from "@/app/(main)/user/actions";
import { clientSignIn } from "@/store/features/auth/authSlice";
import { useAppDispatch } from "@/store/hooks";

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getAuthStatus = async () => {
      try {
        const user = await getUser();
        console.log(user);
        dispatch(clientSignIn());
      } catch (error) {
        console.log(error);
      }
    };

    void getAuthStatus();
  }, [dispatch]);

  return null;
}
