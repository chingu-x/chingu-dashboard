import { Suspense } from "react";

import { Spinner } from "@chingu-x/components/spinner";
import SubmitProjectWrapper from "@/myVoyage/sprints/components/SubmitProjectWrapper";

interface VoyageSubmissionPageProps {
  params: {
    teamId: string;
    meetingId: string;
    sprintNumber: string;
  };
}

export default function VoyageSubmissionPage({
  params,
}: VoyageSubmissionPageProps) {
  return (
    <Suspense fallback={<Spinner />}>
      <SubmitProjectWrapper params={params} />
    </Suspense>
  );
}
