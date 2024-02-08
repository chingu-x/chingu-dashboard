"use client";

import useSyncDispatch from "@/hooks/useSyncDispatch";
import {
  IdeationData,
  fetchIdeations,
} from "@/store/features/ideation/ideationSlice";

interface PreloaderProps {
  payload: IdeationData[];
}

function Preloader({ payload }: PreloaderProps) {
  useSyncDispatch<typeof fetchIdeations>({
    action: fetchIdeations,
    payload,
  });

  return null;
}

export default Preloader;
