"use client";

import { useEffect } from "react";

import {
  fetchSprints,
  setSprintsLoadingFalse,
  type Voyage,
} from "@/store/features/sprint/sprintSlice";
import { useAppDispatch } from "@/store/hooks";

export interface EmptySprintProviderProps {
  voyage: Voyage;
}

export default function EmptySprintProvider({
  voyage,
}: EmptySprintProviderProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSprints(voyage));
    dispatch(setSprintsLoadingFalse());
  }, [dispatch, voyage]);

  return null;
}
