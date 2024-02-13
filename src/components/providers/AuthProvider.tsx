"use client";

import { useEffect } from "react";
import { clientSignIn, clientSignOut } from "@/store/features/auth/authSlice";
import { useAppDispatch } from "@/store/hooks";
import { User, getUserState } from "@/store/features/user/userSlice";

interface AuthProviderProps {
  user: User | null;
  error: Error | null;
}

export default function AuthProvider({ user, error }: AuthProviderProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      dispatch(clientSignIn());
      dispatch(getUserState(user));
    }

    if (error) {
      dispatch(clientSignOut());
    }
  }, [dispatch, user, error]);

  return null;
}
