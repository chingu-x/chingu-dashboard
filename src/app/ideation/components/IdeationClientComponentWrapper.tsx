import { Suspense } from "react";
import IdeationContainer from "./IdeationContainer";
import { store } from "@/store/store";
// import { ideation } from "./fixtures/ideation";

function IdeationClientComponentWrapper() {
  const { projectIdeas } = store.getState().ideation;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {projectIdeas.map((projectIdea) => (
        <IdeationContainer
          key={projectIdea.id}
          title={projectIdea.title}
          project_idea={projectIdea.description}
          vision_statement={projectIdea.vision}
          users={projectIdea.projectIdeaVotes}
          contributed_by={projectIdea.contributedBy}
        />
      ))}
    </Suspense>
  );
}

export default IdeationClientComponentWrapper;
