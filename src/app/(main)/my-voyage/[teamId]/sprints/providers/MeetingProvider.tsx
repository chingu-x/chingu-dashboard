"use client";

import { useEffect } from "react";

import {
  type Meeting,
  type Sprint,
  fetchMeeting,
  fetchSprints,
  setSprintsLoadingFalse,
} from "@/store/features/sprint/sprintSlice";
import { useAppDispatch } from "@/store/hooks";

export interface MeetingProviderProps {
  sprints: Sprint[];
  meeting: Meeting;
  currentSprintNumber: number;
}

export default function MeetingProvider({
  sprints,
  meeting,
  currentSprintNumber,
}: MeetingProviderProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSprints(sprints));
    dispatch(fetchMeeting(meeting));
    dispatch(setSprintsLoadingFalse());
  }, [dispatch, sprints, meeting, currentSprintNumber]);

  return null;
}
