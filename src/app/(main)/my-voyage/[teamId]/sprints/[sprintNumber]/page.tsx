import EmptySprintWrapper from "@/myVoyage/sprints/components/EmptySprintWrapper";

interface EmptySprintPageProps {
  params: {
    teamId: string;
    sprintNumber: string;
  };
}

export default function EmptySprintPage({ params }: EmptySprintPageProps) {
  return <EmptySprintWrapper params={params} />;
}
