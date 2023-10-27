"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";
import { IdeationData, fetchIdeations } from "@/store/features/ideation/ideationSlice";
import { store } from "@/store/store";

interface PreloaderProps {
    data: IdeationData[];
}

function Preloader({ data }: PreloaderProps) {
  const loaded = useRef(false);
  const router = useRouter();
  if (!loaded.current) {
    store.dispatch(fetchIdeations(data));
    loaded.current = true;

    router.refresh();
  }

  return null;
}

export default Preloader;
