"use client";

import { useEffect } from "react";
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

  useEffect(() => {
    dispatch(fetchIdeations(payload));
    dispatch(setProjectIdeasLoadingFalse());
  }, [dispatch, payload]);

  return null;
}
