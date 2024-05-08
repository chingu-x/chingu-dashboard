"use client";

import { useEffect } from "react";
import { clientSignIn, clientSignOut } from "@/store/features/auth/authSlice";
import { useAppDispatch } from "@/store/hooks";
import { type User, getUserState } from "@/store/features/user/userSlice";
import { type AppError } from "@/types/types";

interface AuthProviderProps {
  user: User | null;
  error: AppError | null;
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
