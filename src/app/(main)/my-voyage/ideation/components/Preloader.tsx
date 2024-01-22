"use client";

import { useEffect, useState } from "react";
import {
  IdeationData,
  fetchIdeations,
} from "@/store/features/ideation/ideationSlice";
import { store } from "@/store/store";

interface PreloaderProps {
  data: IdeationData[];
}

function Preloader({ data }: PreloaderProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    store.dispatch(fetchIdeations(data));
    setIsMounted(true);

    // eslint-disable-next-line
  }, []);

  if (!isMounted) return null;

  return null;
}

export default Preloader;
