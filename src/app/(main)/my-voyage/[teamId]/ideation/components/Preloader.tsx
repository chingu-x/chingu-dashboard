"use client";

import {
  IdeationData,
  fetchIdeations,
  setLoadingFalse,
} from "@/store/features/ideation/ideationSlice";
import { useAppDispatch } from "@/store/hooks";

export interface PreloaderProps {
  payload: IdeationData[];
  error?: string;
}

// todo: make preloader reusable
function Preloader({ payload, error }: PreloaderProps) {
  const dispatch = useAppDispatch();

  if (!error) {
    dispatch(fetchIdeations(payload));
    dispatch(setLoadingFalse());
  }

  return null;
}

export default Preloader;
