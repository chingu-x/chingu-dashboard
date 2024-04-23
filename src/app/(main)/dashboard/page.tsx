import PreVoyageDashboard from "./components/pre-voyage-dashboard/PreVoyageDashboard";
import VoyageDashboardPage from "./components/voyage-dashboard/VoyageDashboardPage";

function DashboardPage() {
  // TODO: Mocked temporary value
  const isVoyageStarted = true;

  return isVoyageStarted ? <VoyageDashboardPage /> : <PreVoyageDashboard />;
}

export default DashboardPage;
