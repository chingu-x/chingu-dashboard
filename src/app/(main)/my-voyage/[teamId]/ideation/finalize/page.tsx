import { redirect } from "next/navigation";
import FinalizeIdeationBanner from "./components/FinalizeIdeationBanner";
import FinalizeIdeationList from "./components/FinalizeIdeationList";
import { getUser } from "@/utils/getUser";
import { getCurrentVoyageTeam } from "@/utils/getCurrentVoyageTeam";
import routePaths from "@/utils/routePaths";

interface FinalizeIdeationPageProps {
  params: {
    teamId: string;
  };
}

export default async function FinalizeIdeationPage({
  params,
}: FinalizeIdeationPageProps) {
  const teamId = Number(params.teamId);

  const [user, error] = await getUser();

  const { currentTeam, err } = getCurrentVoyageTeam({ user, error, teamId });

  if (err) {
    return err;
  }

  if (currentTeam) {
    return (
      <div className="flex flex-col items-center w-full gap-y-10">
        <FinalizeIdeationBanner />
        <FinalizeIdeationList />
      </div>
    );
  }

  redirect(routePaths.dashboardPage());
}
