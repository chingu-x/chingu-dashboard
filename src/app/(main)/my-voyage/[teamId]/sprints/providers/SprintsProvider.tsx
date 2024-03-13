"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import {
  Sprint,
  fetchSprints,
  setSprintsLoadingFalse,
} from "@/store/features/sprint/sprintSlice";
import { useAppDispatch } from "@/store/hooks";
import routePaths from "@/utils/routePaths";

export interface SprintsProviderProps {
  payload: Sprint[];
  teamId: number;
  currentSprintNumber: number;
}

export default function IdeationProvider({
  payload,
  teamId,
  currentSprintNumber,
}: SprintsProviderProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSprints(payload));
    dispatch(setSprintsLoadingFalse());

    router.push(
      routePaths.sprintPage(teamId.toString(), currentSprintNumber.toString()),
    );
  }, [dispatch, payload, router, currentSprintNumber, teamId]);

  return null;
}
