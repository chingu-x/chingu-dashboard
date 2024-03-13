"use client";

import { useEffect } from "react";

import {
  Meeting,
  fetchMeeting,
  setSprintsLoadingFalse,
} from "@/store/features/sprint/sprintSlice";
import { useAppDispatch } from "@/store/hooks";

export interface MeetingProviderProps {
  payload: Meeting;
}

export default function MeetingProvider({ payload }: MeetingProviderProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMeeting(payload));
    dispatch(setSprintsLoadingFalse());
  }, [dispatch, payload]);

  return null;
}
