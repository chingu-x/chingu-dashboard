"use client";

import {
  IdeationData,
  fetchIdeations,
  setProjectIdeasLoadingFalse,
} from "@/store/features/ideation/ideationSlice";
import { useAppDispatch } from "@/store/hooks";

export interface PreloaderProps {
  payload: IdeationData[];
}

function Preloader({ payload }: PreloaderProps) {
  const dispatch = useAppDispatch();

  dispatch(fetchIdeations(payload));
  dispatch(setProjectIdeasLoadingFalse());

  return null;
}

export default Preloader;
