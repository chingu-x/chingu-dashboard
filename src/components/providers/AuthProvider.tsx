"use client";

import { useEffect } from "react";
import { clientSignIn, clientSignOut } from "@/store/features/auth/authSlice";
import { useAppDispatch } from "@/store/hooks";
import { User, getUserState } from "@/store/features/user/userSlice";

interface AuthProviderProps {
  user: User;
}

export default function AuthProvider({ user }: AuthProviderProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      dispatch(clientSignIn());
      dispatch(getUserState(user));
    } else {
      dispatch(clientSignOut());
    }
  }, [dispatch, user]);

  return null;
}
