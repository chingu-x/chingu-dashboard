import { Suspense } from "react";
import { redirect } from "next/navigation";
import Spinner from "@/components/Spinner";
import WeeklyCheckInWrapper from "@/myVoyage/sprints/components/WeeklyCheckInWrapper";
import { getUser } from "@/utils/getUser";
import { getCurrentVoyageTeam } from "@/utils/getCurrentVoyageTeam";
import routePaths from "@/utils/routePaths";

interface WeeklyCheckInPageProps {
  params: {
    teamId: string;
    meetingId: string;
    sprintNumber: string;
  };
}

export default async function WeeklyCheckInPage({
  params,
}: WeeklyCheckInPageProps) {
  const teamId = Number(params.teamId);

  const [user, error] = await getUser();

  const { err, currentTeam } = getCurrentVoyageTeam({ user, error, teamId });

  if (err) {
    return err;
  }

  if (currentTeam) {
    return (
      <Suspense fallback={<Spinner />}>
        <WeeklyCheckInWrapper params={params} />
      </Suspense>
    );
  }
  redirect(routePaths.dashboardPage());
}
