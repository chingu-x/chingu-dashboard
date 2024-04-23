import VoyageDashboardPage from "@/app/(main)/dashboard/components/voyage-dashboard/VoyageDashboardPage";
import PreVoyageDashboard from "@/app/(main)/dashboard/components/pre-voyage-dashboard/PreVoyageDashboard";

interface VoyageMemberDashboardPageProps {
  params: {
    teamId: string;
  };
}
function VoyageMemberDashboardPage({ params }: VoyageMemberDashboardPageProps) {
  // TODO: Mocked temporary value
  const isVoyageStarted = true;

  return isVoyageStarted ? (
    <VoyageDashboardPage teamId={params.teamId} />
  ) : (
    <PreVoyageDashboard />
  );
}

export default VoyageMemberDashboardPage;
