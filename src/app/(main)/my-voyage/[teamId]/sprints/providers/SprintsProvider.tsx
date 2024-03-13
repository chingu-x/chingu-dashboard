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
  meetingId: number;
}

export default function SprintsProvider({
  payload,
  teamId,
  meetingId,
}: SprintsProviderProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSprints(payload));
    dispatch(setSprintsLoadingFalse());

    // TODO: need to include currentSprintNumber too
    router.push(routePaths.sprintPage(teamId.toString(), meetingId.toString()));
  }, [dispatch, payload, router, meetingId, teamId]);

  return null;
}
