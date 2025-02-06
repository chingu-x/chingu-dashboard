"use client";

import "reflect-metadata";
import TopicForm from "@/myVoyage/sprints/components/forms/AgendaTopicForm";
import { useUser } from "@/store/hooks";
import useCheckCurrentVoyageTeam from "@/hooks/useCheckCurrentVoyageTeam";

interface EditTopicPageProps {
  params: {
    teamId: string;
  };
}

export default function EditTopicPage({ params }: EditTopicPageProps) {
  const { teamId } = params;
  const user = useUser();

  useCheckCurrentVoyageTeam({ user, teamId });
  return <TopicForm />;
}
