"use client";

import { useEffect } from "react";
import { clientSignIn } from "@/store/features/auth/authSlice";
import { useAppDispatch } from "@/store/hooks";
import { User, getUserState } from "@/store/features/user/userSlice";

interface AuthProviderProps {
  user: User;
}

export default function AuthProvider({ user }: AuthProviderProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clientSignIn());
    dispatch(getUserState(user));
  }, [dispatch, user]);

  return null;
}
