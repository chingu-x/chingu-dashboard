import IdeationContainer from "./IdeationContainer";
import { getUser } from "@/app/(auth)/authService";
import { fetchProjectIdeas } from "@/app/(main)/my-voyage/ideation/ideationService";
import { IdeationData } from "@/store/features/ideation/ideationSlice";
// import { ideation } from "./fixtures/ideation";

export default async function IdeationComponentWrapper() {
  let projectIdeas = [] as IdeationData[];
  const user = await getUser();

  const currentVoyageTeam = user.voyageTeamMembers.find(
    (voyage) => voyage.voyageTeam.voyage.status.name === "Active"
  );

  console.log("page 1", user);
  const teamId = currentVoyageTeam?.voyageTeamId;

  if (teamId) {
    projectIdeas = await fetchProjectIdeas({ teamId });
  }

  function renderJSX() {
    if (teamId) {
      return projectIdeas.map((projectIdea) => (
        <IdeationContainer
          key={projectIdea.id}
          title={projectIdea.title}
          project_idea={projectIdea.description}
          vision_statement={projectIdea.vision}
          users={projectIdea.projectIdeaVotes}
          contributed_by={projectIdea.contributedBy}
        />
      ));
    }

    return null;
  }

  return renderJSX();
}
