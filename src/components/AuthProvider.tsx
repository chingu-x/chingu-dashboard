"use client";

import { useEffect } from "react";
import { clientSignIn } from "@/store/features/auth/authSlice";
import { useAppDispatch } from "@/store/hooks";

interface AuthInitProps {
  hasCookie: boolean;
}

export default function AuthInit({ hasCookie }: AuthInitProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (hasCookie) {
      dispatch(clientSignIn());
    }
  }, [dispatch, hasCookie]);

  return null;
}
