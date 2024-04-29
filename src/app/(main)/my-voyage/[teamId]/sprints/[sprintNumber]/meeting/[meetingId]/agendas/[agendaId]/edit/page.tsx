import { redirect } from "next/navigation";
import TopicForm from "@/myVoyage/sprints/components/forms/AgendaTopicForm";
import { getCurrentVoyageTeam } from "@/utils/getCurrentVoyageTeam";
import routePaths from "@/utils/routePaths";
import { getUser } from "@/utils/getUser";

interface EditTopicPageProps {
  params: {
    teamId: string;
  };
}

export default async function EditTopicPage({ params }: EditTopicPageProps) {
  const teamId = Number(params.teamId);

  const [user, error] = await getUser();

  const { err, currentTeam } = getCurrentVoyageTeam({ user, error, teamId });

  if (err) {
    return err;
  }

  if (currentTeam) {
    return <TopicForm />;
  }

  redirect(routePaths.dashboardPage());
}
