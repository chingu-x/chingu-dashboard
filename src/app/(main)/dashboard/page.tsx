import { redirect } from "next/navigation";
import { getUser } from "@/utils/getUser";
import routePaths from "@/utils/routePaths";

async function DashboardPage() {
  // TODO: Mocked temporary value
  const isVoyageStarted = true;

  const [user] = await getUser();

  const teamMember = user?.voyageTeamMembers.find(
    (voyage) => voyage.voyageTeam.voyage.status.name === "Active",
  );

  if (teamMember && isVoyageStarted) {
    redirect(
      routePaths.VoyageMemberDashboardPage(teamMember?.voyageTeamId.toString()),
    );
  }

  return <div>Default Dashboard</div>;
}

export default DashboardPage;
