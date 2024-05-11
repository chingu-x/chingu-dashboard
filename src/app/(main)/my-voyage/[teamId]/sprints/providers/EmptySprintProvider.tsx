"use client";

import { useEffect } from "react";

import {
  type Sprint,
  fetchSprints,
  setSprintsLoadingFalse,
} from "@/store/features/sprint/sprintSlice";
import { useAppDispatch } from "@/store/hooks";

export interface EmptySprintProviderProps {
  sprints: Sprint[];
  currentSprintNumber: number;
}

export default function EmptySprintProvider({
  sprints,
  currentSprintNumber,
}: EmptySprintProviderProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSprints(sprints));
    dispatch(setSprintsLoadingFalse());
  }, [dispatch, sprints, currentSprintNumber]);

  return null;
}
