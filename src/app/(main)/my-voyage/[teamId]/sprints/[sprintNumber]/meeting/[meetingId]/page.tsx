import { Suspense } from "react";
import { Spinner } from "@chingu-x/components/spinner";
import SprintWrapper from "@/myVoyage/sprints/components/SprintWrapper";

interface SprintPageProps {
  params: {
    teamId: string;
    sprintNumber: string;
    meetingId: string;
  };
}

export default function SprintPage({ params }: SprintPageProps) {
  return (
    <Suspense fallback={<Spinner />}>
      <SprintWrapper params={params} />
    </Suspense>
  );
}
