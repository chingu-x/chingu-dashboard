import { redirect } from "next/navigation";
import IdeationContainer from "./IdeationContainer";
import Preloader from "./Preloader";
import { getUser } from "@/utils/getUser";
import { FetchIdeationsProps } from "@/app/(main)/my-voyage/[teamId]/ideation/ideationService";
import { IdeationData } from "@/store/features/ideation/ideationSlice";
import { getCookie } from "@/utils/getCookie";
import { GET } from "@/utils/requests";
// import { ideation } from "./fixtures/ideation";

export async function fetchProjectIdeas({
  teamId,
}: FetchIdeationsProps): Promise<IdeationData[]> {
  const token = getCookie();
  return await GET<IdeationData[]>(
    `api/v1/voyages/${teamId}/ideations`,
    token,
    "force-cache",
  );
}

export default async function IdeationComponentWrapper() {
  let projectIdeas = [] as IdeationData[];
  let user;
  let currentVoyageTeam;

  try {
    user = await getUser();
    currentVoyageTeam = user.voyageTeamMembers.find(
      (voyage) => voyage.voyageTeam.voyage.status.name === "Active",
    );
  } catch (error) {
    if ((error as Error).toString().includes("401")) {
      redirect("/");
    }

    throw error;
  }

  const teamId = currentVoyageTeam?.voyageTeamId;

  if (teamId) {
    projectIdeas = await fetchProjectIdeas({ teamId });
  } else {
    redirect("/");
  }

  return (
    <>
      <Preloader payload={projectIdeas} />
      {projectIdeas.map((projectIdea) => (
        <IdeationContainer
          key={projectIdea.id}
          projectIdeaId={projectIdea.id}
          title={projectIdea.title}
          project_idea={projectIdea.description}
          vision_statement={projectIdea.vision}
          users={projectIdea.projectIdeaVotes}
          contributed_by={projectIdea.contributedBy}
          teamId={teamId}
        />
      ))}
    </>
  );
}
