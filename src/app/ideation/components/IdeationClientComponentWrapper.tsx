"use client";

import IdeationContainer from "./IdeationContainer";
import { useAppSelector } from "@/store/hooks";
// import { ideation } from "./fixtures/ideation";

function IdeationClientComponentWrapper() {
  const { projectIdeas } = useAppSelector((state) => state.ideation);

  return (
    <>
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
    </>
  );
}

export default IdeationClientComponentWrapper;
