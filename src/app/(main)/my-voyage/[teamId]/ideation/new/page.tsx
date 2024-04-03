import { redirect } from "next/navigation";
import IdeationForm from "@/app/(main)/my-voyage/[teamId]/ideation/components/IdeationForm";
import { getCurrentVoyageTeam } from "@/utils/getCurrentVoyageTeam";
import routePaths from "@/utils/routePaths";

interface AddIdeationPageProps {
  params: {
    teamId: string;
  };
}

export default async function AddIdeationPage({
  params,
}: AddIdeationPageProps) {
  const teamId = Number(params.teamId);

  const data = await getCurrentVoyageTeam({ teamId });

  if (data) {
    if (typeof data === "string") return data;

    return <IdeationForm />;
  }

  redirect(routePaths.dashboardPage());
}
