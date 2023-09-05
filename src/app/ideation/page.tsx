import {
  CreateIdeationContainer,
  IdeationContainer,
  ideation,
} from "./components";

function IdeationPage() {
  return (
    <div className="flex flex-row justify-center">
      <div className="flex flex-col gap-y-9 p-3">
        <CreateIdeationContainer />
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
      </div>
    </div>
  );
}

export default IdeationPage;
