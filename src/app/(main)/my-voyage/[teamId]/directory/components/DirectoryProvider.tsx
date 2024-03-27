"use client";

import { useEffect } from "react";
import {
  TeamDirectory,
  fetchTeamDirectory,
} from "@/store/features/directory/directorySlice";
import { useAppDispatch } from "@/store/hooks";

export interface DirectoryProviderProps {
  payload: TeamDirectory;
}

export default function DirectoryProvider({ payload }: DirectoryProviderProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTeamDirectory(payload));
  }, [dispatch, payload]);

  return null;
}
