import { Suspense } from "react";
import Spinner from "@/components/Spinner";
import EmptySprintWrapper from "@/sprints/components/EmptySprintWrapper";

interface SprintPageProps {
  params: {
    teamId: string;
    sprintNumber: string;
    meetingId: string;
  };
}

export default function EmptySprintPage({ params }: SprintPageProps) {
  return (
    <Suspense fallback={<Spinner />}>
      <EmptySprintWrapper params={params} />
    </Suspense>
  );
}
