"use client";

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

  dispatch(fetchTeamDirectory(payload));
  //   dispatch(setProjectIdeasLoadingFalse());

  return null;
}
