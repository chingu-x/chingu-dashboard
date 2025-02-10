import { Suspense } from "react";
import { Spinner } from "@chingu-x/components/spinner";
import EmptySprintWrapper from "@/myVoyage/sprints/components/EmptySprintWrapper";

interface EmptySprintPageProps {
  params: {
    teamId: string;
    sprintNumber: string;
  };
}

export default function EmptySprintPage({ params }: EmptySprintPageProps) {
  return (
    <Suspense fallback={<Spinner />}>
      <EmptySprintWrapper params={params} />
    </Suspense>
  );
}
