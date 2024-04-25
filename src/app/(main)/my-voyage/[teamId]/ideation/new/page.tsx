import { redirect } from "next/navigation";
import IdeationForm from "@/app/(main)/my-voyage/[teamId]/ideation/components/IdeationForm";
import { getCurrentVoyageTeam } from "@/utils/getCurrentVoyageTeam";
import routePaths from "@/utils/routePaths";
import { getUser } from "@/utils/getUser";

interface AddIdeationPageProps {
  params: {
    teamId: string;
  };
}

export default async function AddIdeationPage({
  params,
}: AddIdeationPageProps) {
  const teamId = Number(params.teamId);

  const [user, error] = await getUser();

  const { err, currentTeam } = getCurrentVoyageTeam({ user, error, teamId });

  if (err) {
    return err;
  }

  if (currentTeam) {
    return <IdeationForm />;
  }

  redirect(routePaths.dashboardPage());
}
