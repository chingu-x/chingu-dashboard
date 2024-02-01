"use client";

import { useEffect, useState } from "react";
import {
  IdeationData,
  fetchIdeations,
} from "@/store/features/ideation/ideationSlice";
import { useAppDispatch } from "@/store/hooks";

interface PreloaderProps {
  data: IdeationData[];
}

function Preloader({ data }: PreloaderProps) {
  const [isMounted, setIsMounted] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchIdeations(data));
    setIsMounted(true);

    // eslint-disable-next-line
  }, []);

  if (!isMounted) return null;

  return null;
}

export default Preloader;
