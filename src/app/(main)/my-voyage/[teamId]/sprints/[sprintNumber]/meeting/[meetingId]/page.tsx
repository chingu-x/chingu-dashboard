import { Suspense } from "react";
import Spinner from "@/components/Spinner";
import SprintWrapper from "@/sprints/components/SprintWrapper";

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
