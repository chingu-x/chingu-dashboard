import React from "react";
import PreVoyageDashboard from "./components/pre-voyage-dashboard/PreVoyageDashboard";
import VoyageDashboard from "./components/voyage-dashboard/VoyageDashboard";

function DashboardPage() {
  // TODO: Mocked temporary value
  const isVoyageStarted = true;

  return isVoyageStarted ? <VoyageDashboard /> : <PreVoyageDashboard />;
}

export default DashboardPage;
