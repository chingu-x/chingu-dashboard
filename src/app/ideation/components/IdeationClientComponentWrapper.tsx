"use client";

import IdeationContainer from "./IdeationContainer";
import { ideation } from "./fixtures/ideation";

function IdeationClientComponentWrapper() {
  return (
    <>
      {ideation.map((i) => (
        <IdeationContainer
          key={i.id}
          title={i.title}
          project_idea={i.project_idea}
          vision_statement={i.vision_statement}
          users={i.users}
          voted={i.voted}
          own_idea={i.own_idea}
          contributed_by={i.contributed_by}
        />
      ))}
    </>
  );
}

export default IdeationClientComponentWrapper;
