"use client";

import { useEffect } from "react";

import {
  type Meeting,
  fetchMeeting,
  fetchSprints,
  setSprintsLoadingFalse,
  type Voyage,
} from "@/store/features/sprint/sprintSlice";
import { useAppDispatch } from "@/store/hooks";

export interface MeetingProviderProps {
  voyage: Voyage;
  meeting: Meeting;
}

export default function MeetingProvider({
  voyage,
  meeting,
}: MeetingProviderProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSprints(voyage));
    dispatch(fetchMeeting(meeting));
    dispatch(setSprintsLoadingFalse());
  }, [dispatch, voyage, meeting]);

  return null;
}
