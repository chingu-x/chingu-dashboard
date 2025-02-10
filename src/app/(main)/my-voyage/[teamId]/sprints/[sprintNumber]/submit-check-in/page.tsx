import { Suspense } from "react";

import { Spinner } from "@chingu-x/components/spinner";
import WeeklyCheckInWrapper from "@/myVoyage/sprints/components/WeeklyCheckInWrapper";

interface WeeklyCheckInPageProps {
  params: {
    teamId: string;
    meetingId: string;
    sprintNumber: string;
  };
}

export default function WeeklyCheckInPage({ params }: WeeklyCheckInPageProps) {
  return (
    <Suspense fallback={<Spinner />}>
      <WeeklyCheckInWrapper params={params} />
    </Suspense>
  );
}
