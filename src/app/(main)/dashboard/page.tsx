import { redirect } from "next/navigation";
import PreVoyageDashboard from "./components/pre-voyage-dashboard/PreVoyageDashboard";
import VoyageDashboardPage from "./components/voyage-dashboard/VoyageDashboardPage";
import { getUser } from "@/utils/getUser";

async function DashboardPage() {
  // TODO: Mocked temporary value
  const isVoyageStarted = true;

  const [user] = await getUser();

  const teamMember = user?.voyageTeamMembers.find(
    (voyage) => voyage.voyageTeam.voyage.status.name === "Active",
  );

  const teamId = teamMember?.voyageTeamId;

  if (teamId && isVoyageStarted) {
    redirect(`/dashboard/${teamId}`);
  }

  return isVoyageStarted ? <VoyageDashboardPage /> : <PreVoyageDashboard />;
}

export default DashboardPage;
