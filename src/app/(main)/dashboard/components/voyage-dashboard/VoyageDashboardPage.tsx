import React, { Suspense } from "react";
import { Spinner } from "@chingu-x/components/spinner";
import VoyageDashboard from "./VoyageDashboard";

interface VoyageDashboardPageProps {
  teamId?: string;
}
function VoyageDashboardPage({ teamId }: VoyageDashboardPageProps) {
  return (
    <Suspense fallback={<Spinner />}>
      <VoyageDashboard teamId={teamId} />
    </Suspense>
  );
}

export default VoyageDashboardPage;
