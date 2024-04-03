import { Suspense } from "react";
import Spinner from "@/components/Spinner";
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
