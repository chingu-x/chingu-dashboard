"use client";

import {
  IdeationData,
  fetchIdeations,
  setProjectIdeasLoadingFalse,
} from "@/store/features/ideation/ideationSlice";
import { useAppDispatch } from "@/store/hooks";

export interface IdeationProviderProps {
  payload: IdeationData[];
}

export default function IdeationProvider({ payload }: IdeationProviderProps) {
  const dispatch = useAppDispatch();

  dispatch(fetchIdeations(payload));
  dispatch(setProjectIdeasLoadingFalse());

  return null;
}
