import { redirect } from "next/navigation";
import IdeationForm from "@/app/(main)/my-voyage/[teamId]/ideation/components/IdeationForm";
import { getCurrentVoyageTeam } from "@/utils/getCurrentVoyageTeam";
import routePaths from "@/utils/routePaths";

interface EditIdeationPageProps {
  params: {
    teamId: string;
  };
}

export default async function EditIdeationPage({
  params,
}: EditIdeationPageProps) {
  const teamId = Number(params.teamId);

  const data = await getCurrentVoyageTeam({ teamId });

  if (data) {
    if (typeof data === "string") return data;

    return <IdeationForm />;
  }

  redirect(routePaths.dashboardPage());
}
