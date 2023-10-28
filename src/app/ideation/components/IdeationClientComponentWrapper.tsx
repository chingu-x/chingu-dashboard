import IdeationContainer from "./IdeationContainer";
// import { ideation } from "./fixtures/ideation";
import { store } from "@/store/store";

function IdeationClientComponentWrapper() {
  const { data } = store.getState().ideation;

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
