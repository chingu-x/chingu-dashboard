import React, { Suspense } from "react";
import VoyageDashboard from "./VoyageDashboard";
import Spinner from "@/components/Spinner";

function VoyageDashboardPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <VoyageDashboard />
    </Suspense>
  );
}

export default VoyageDashboardPage;
