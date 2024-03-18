import { Suspense } from "react";

import SprintsRedirectWrapper from "./components/SprintsRedirectWrapper";
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
      <SprintsRedirectWrapper params={params} />
    </Suspense>
  );
}
