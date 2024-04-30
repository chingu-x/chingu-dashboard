import { redirect } from "next/navigation";
import MeetingForm from "@/myVoyage/sprints/components/forms/MeetingForm";
import { getCurrentVoyageTeam } from "@/utils/getCurrentVoyageTeam";
import routePaths from "@/utils/routePaths";
import { getUser } from "@/utils/getUser";

interface CreateMeetingPageProps {
  params: {
    teamId: string;
  };
}

export default async function CreateMeetingPage({
  params,
}: CreateMeetingPageProps) {
  const teamId = Number(params.teamId);

  const [user, error] = await getUser();

  const { err, currentTeam } = getCurrentVoyageTeam({ user, error, teamId });

  if (err) {
    return err;
  }

  if (currentTeam) {
    return <MeetingForm />;
  }

  redirect(routePaths.dashboardPage());
}
