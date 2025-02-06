"use client";

import "reflect-metadata";
import TopicForm from "@/myVoyage/sprints/components/forms/AgendaTopicForm";
import { useUser } from "@/store/hooks";
import useCheckCurrentVoyageTeam from "@/hooks/useCheckCurrentVoyageTeam";

interface AddTopicPageProps {
  params: {
    teamId: string;
  };
}

export default function AddTopicPage({ params }: AddTopicPageProps) {
  const { teamId } = params;
  const user = useUser();

  useCheckCurrentVoyageTeam({ user, teamId });
  return <TopicForm />;
}
