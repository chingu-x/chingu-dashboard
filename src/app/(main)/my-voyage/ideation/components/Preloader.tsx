"use client";

import useDispatchClientStore from "@/hooks/useDispatchClientStore";
import {
  IdeationData,
  fetchIdeations,
} from "@/store/features/ideation/ideationSlice";

interface PreloaderProps {
  payload: IdeationData[];
}

function Preloader({ payload }: PreloaderProps) {
  useDispatchClientStore<typeof fetchIdeations>({
    action: fetchIdeations,
    payload,
  });

  return null;
}

export default Preloader;
