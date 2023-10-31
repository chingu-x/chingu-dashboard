"use client";

import { useEffect, useState } from "react";
import IdeationContainer from "./IdeationContainer";
import { store } from "@/store/store";
import { IdeationData } from "@/store/features/ideation/ideationSlice";
// import { ideation } from "./fixtures/ideation";

function IdeationClientComponentWrapper() {
  const [projectIdeas, setProjectIdeas] = useState<IdeationData[]>([]);
  const [loading, setLoading] = useState(false);

  console.log(loading);

  useEffect(() => {
    setLoading(true);
    const { projectIdeas } = store.getState().ideation;

    setProjectIdeas(projectIdeas);

    setLoading(false);
    
  }, []);
  

  return (
    <>
      {loading === true && <div>Loading...</div>}
      {loading === false && projectIdeas.map((projectIdea) => (
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
