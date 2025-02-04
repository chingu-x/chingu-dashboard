"use client";

import "reflect-metadata";
import { redirect } from "next/navigation";
import MeetingForm from "@/myVoyage/sprints/components/forms/MeetingForm";
import { getCurrentVoyageTeam } from "@/utils/getCurrentVoyageTeam";
import routePaths from "@/utils/routePaths";
import { getUser } from "@/utils/getUser";
import { useUser } from "@/store/hooks";
import useCheckCurrentVoyageTeam from "@/hooks/useCheckCurrentVoyageTeam";

interface EditMeetingPageProps {
  params: {
    teamId: string;
  };
}

export default function EditMeetingPage({ params }: EditMeetingPageProps) {
  const { teamId } = params;
  const user = useUser();

  useCheckCurrentVoyageTeam({ user, teamId });

  return <MeetingForm />;
}
