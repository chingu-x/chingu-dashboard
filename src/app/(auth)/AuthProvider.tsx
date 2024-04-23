"use client";

import { useEffect } from "react";
import { clientSignIn, clientSignOut } from "@/store/features/auth/authSlice";
import { useAppDispatch } from "@/store/hooks";
import { User, getUserState } from "@/store/features/user/userSlice";
import { AppError } from "@/types/types";

interface AuthProviderProps {
  user: User | null;
  error: AppError | null;
}

export default function AuthProvider({ user, error }: AuthProviderProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      dispatch(clientSignIn());
      // Add the currentDate field to the user object
      const userWithDate = { ...user, currentDate: new Date() };
      // Dispatch the getUserState action with the user object
      dispatch(getUserState(userWithDate));
    }

    if (error) {
      dispatch(clientSignOut());
    }
  }, [dispatch, user, error]);

  return null;
}
