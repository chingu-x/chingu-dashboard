import { redirect } from "next/navigation";
import FinalizeTechBanner from "./FinalizeTechBanner";
import FinalizeTechList from "./FinalizeTechList";
import { getUser } from "@/utils/getUser";
import { getCurrentVoyageTeam } from "@/utils/getCurrentVoyageTeam";
import routePaths from "@/utils/routePaths";

interface FinalizeTechStackPageProps {
  params: {
    teamiId: string;
  };
}

export default async function FinalizeTechStackPage(
  {
    // params,
  }: FinalizeTechStackPageProps,
) {
  const teamId = 6;
  //const teamId = params.teamiId;
  const [user, error] = await getUser();

  const { currentTeam, err } = getCurrentVoyageTeam({ user, error, teamId });

  if (err) {
    return err;
  }

  if (currentTeam) {
    return (
      <div className="flex h-screen w-full flex-col items-center [&>*]:my-5 [&>*]:w-[871px]">
        <FinalizeTechBanner />
        <FinalizeTechList />
        {/**
         * list of SelectTechCards
         * finalize button
         * cancel button
         */}
      </div>
    );
  }
  redirect(routePaths.dashboardPage());
}
