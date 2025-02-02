"use client";

import "reflect-metadata";
import MeetingForm from "@/myVoyage/sprints/components/forms/MeetingForm";
import { useUser } from "@/store/hooks";
import useCheckCurrentVoyageTeam from "@/hooks/useCheckCurrentVoyageTeam";

interface CreateMeetingPageProps {
  params: {
    teamId: string;
  };
}

export default function CreateMeetingPage({ params }: CreateMeetingPageProps) {
  const { teamId } = params;
  const user = useUser();

  useCheckCurrentVoyageTeam({ user, teamId });

  return <MeetingForm />;
}
