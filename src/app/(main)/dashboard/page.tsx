/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { redirect } from "next/navigation";
import { getUser } from "@/utils/getUser";
import routePaths from "@/utils/routePaths";

async function DashboardPage() {
  const [user] = await getUser();

  const teamMember = user?.voyageTeamMembers.find(
    (voyage: any) => voyage.voyageTeam.voyage.status.name === "Active",
  );

  if (teamMember) {
    redirect(
      routePaths.VoyageMemberDashboardPage(teamMember?.voyageTeamId.toString()),
    );
  }

  return <div>Default Dashboard</div>;
}

export default DashboardPage;
