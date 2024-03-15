"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import routePaths from "@/utils/routePaths";

export interface SprintsProviderProps {
  teamId: number;
  meetingId: number;
}

export default function SprintsProvider({
  teamId,
  meetingId,
}: SprintsProviderProps) {
  const router = useRouter();

  useEffect(() => {
    router.push(routePaths.sprintPage(teamId.toString(), meetingId.toString()));
  }, [router, meetingId, teamId]);

  return null;
}
