import { redirect } from "next/navigation";
import { getUser } from "@/utils/getUser";
import routePaths from "@/utils/routePaths";

async function DashboardPage() {
  const [user] = await getUser();

  const teamMember = user?.voyageTeamMembers.find(
    (voyage) => voyage.voyageTeam.voyage.status.name === "Active",
  );

  if (teamMember) {
    redirect(
      routePaths.VoyageMemberDashboardPage(teamMember?.voyageTeamId.toString()),
    );
  }

  return <div>Default Dashboard</div>;
}

export default DashboardPage;
