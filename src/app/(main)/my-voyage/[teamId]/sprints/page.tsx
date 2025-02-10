import { Suspense } from "react";

import { Spinner } from "@chingu-x/components/spinner";
import RedirectToCurrentSprintWrapper from "./components/RedirectToCurrentSprintWrapper";

interface SprintsPageProps {
  params: {
    teamId: string;
    sprintNumber: string;
  };
}

export default function SprintsPage({ params }: SprintsPageProps) {
  return (
    <Suspense fallback={<Spinner />}>
      <RedirectToCurrentSprintWrapper params={params} />
    </Suspense>
  );
}
