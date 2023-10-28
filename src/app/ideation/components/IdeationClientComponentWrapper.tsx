"use client";

import { Suspense } from "react";
import IdeationContainer from "./IdeationContainer";
import { useAppSelector } from "@/store/hooks";
// import { ideation } from "./fixtures/ideation";

function IdeationClientComponentWrapper() {
  const { data } = useAppSelector((state) => state.ideation);

  return (
    <Suspense fallback={<div>Loading...</div>}>
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
    </Suspense>
  );
}

export default IdeationClientComponentWrapper;
