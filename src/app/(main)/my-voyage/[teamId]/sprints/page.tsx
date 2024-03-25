import { Suspense } from "react";

import RedirectToCurrentSprintWrapper from "./components/RedirectToCurrentSprintWrapper";
import Spinner from "@/components/Spinner";

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
