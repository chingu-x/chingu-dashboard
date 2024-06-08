import { Suspense } from "react";

import WeeklyCheckInWrapper from "@/myVoyage/sprints/components/WeeklyCheckInWrapper";
import Spinner from "@/components/Spinner";

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
