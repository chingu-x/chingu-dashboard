"use client";

import IdeationContainer from "./IdeationContainer";
import { useAppSelector } from "@/store/hooks";
// import { ideation } from "./fixtures/ideation";

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
