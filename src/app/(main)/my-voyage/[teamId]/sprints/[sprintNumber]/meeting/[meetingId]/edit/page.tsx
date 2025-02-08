"use client";

import "reflect-metadata";
import MeetingForm from "@/myVoyage/sprints/components/forms/MeetingForm";
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
