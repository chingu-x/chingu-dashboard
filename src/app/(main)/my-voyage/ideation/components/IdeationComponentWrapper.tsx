import IdeationContainer from "./IdeationContainer";
import { IdeationData } from "@/store/features/ideation/ideationSlice";
// import { ideation } from "./fixtures/ideation";

interface IdeationComponentWrapperProps {
  projectIdeas: IdeationData[];
}

export default function IdeationComponentWrapper({
  projectIdeas,
}: IdeationComponentWrapperProps) {
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
