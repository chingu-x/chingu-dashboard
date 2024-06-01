import { Suspense } from "react";

import SubmitProjectWrapper from "@/myVoyage/sprints/components/SubmitProjectWrapper";
import Spinner from "@/components/Spinner";

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
