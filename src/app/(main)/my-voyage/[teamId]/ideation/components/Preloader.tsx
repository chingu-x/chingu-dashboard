"use client";

import useSyncDispatch from "@/hooks/useSyncDispatch";
import {
  IdeationData,
  fetchIdeations,
  setLoadingFalse,
} from "@/store/features/ideation/ideationSlice";

interface PreloaderProps {
  payload: IdeationData[];
}

function Preloader({ payload }: PreloaderProps) {
  useSyncDispatch<typeof fetchIdeations>({
    action: fetchIdeations,
    loadAction: setLoadingFalse,
    payload,
  });

  return null;
}

export default Preloader;
