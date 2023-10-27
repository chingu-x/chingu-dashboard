"use client";

import IdeationContainer from "./IdeationContainer";
// import { ideation } from "./fixtures/ideation";
import { useAppSelector } from "@/store/hooks";

function IdeationClientComponentWrapper() {
  const { data } = useAppSelector((state) => state.ideation);

  return (
    <>
      {data.map((i) => (
        <IdeationContainer
          key={i.id}
          title={i.title}
          project_idea={i.description}
          vision_statement={i.vision}
          users={i.projectIdeaVotes}
          contributed_by={i.contributedBy}
        />
      ))}
    </>
  );
}

export default IdeationClientComponentWrapper;
