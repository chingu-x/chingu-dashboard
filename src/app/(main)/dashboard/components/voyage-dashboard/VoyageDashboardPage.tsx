import React, { Suspense } from "react";
import VoyageDashboard from "./VoyageDashboard";
import Spinner from "@/components/Spinner";

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
