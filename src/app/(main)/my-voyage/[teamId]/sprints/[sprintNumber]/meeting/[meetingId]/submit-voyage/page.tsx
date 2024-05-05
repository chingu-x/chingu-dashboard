import { Suspense } from "react";
import { redirect } from "next/navigation";

import SubmitProjectWrapper from "@/myVoyage/sprints/components/SubmitProjectWrapper";
import Spinner from "@/components/Spinner";

import { getUser } from "@/utils/getUser";
import { getCurrentVoyageTeam } from "@/utils/getCurrentVoyageTeam";
import routePaths from "@/utils/routePaths";

interface VoyageSubmissionPageProps {
  params: {
    teamId: string;
    meetingId: string;
    sprintNumber: string;
  };
}

export default async function VoyageSubmissionPage({
  params,
}: VoyageSubmissionPageProps) {
  const teamId = Number(params.teamId);

  const [user, error] = await getUser();

  const { err, currentTeam } = getCurrentVoyageTeam({ user, error, teamId });

  if (err) {
    return err;
  }

  if (currentTeam) {
    return (
      <Suspense fallback={<Spinner />}>
        <SubmitProjectWrapper params={params} />
      </Suspense>
    );
  }
  redirect(routePaths.dashboardPage());
}
