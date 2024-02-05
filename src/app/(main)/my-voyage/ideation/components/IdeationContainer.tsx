import ContributionCard from "./ContributionCard";
import VoteCard from "./VoteCard";
// import type { Ideation } from "./fixtures/ideation";
import {
  ProjectIdeaVotes,
  VoyageMember,
} from "@/store/features/ideation/ideationSlice";

interface IdeationContainerProps {
  projectIdeaId: number;
  title: string;
  project_idea: string;
  vision_statement: string;
  users: ProjectIdeaVotes[];
  contributed_by: {
    member: VoyageMember;
  };
  teamId: number;
}

export default function IdeationContainer({
  projectIdeaId,
  title,
  project_idea,
  vision_statement,
  users,
  contributed_by,
  teamId,
}: IdeationContainerProps) {
  return (
    <div className="card w-[1056px] 3xl:w-full bg-base-200 flex flex-row items-start p-10 gap-x-20 rounded-2xl max-h-[400px]">
      <div className="flex flex-col justify-between gap-y-[24px] min-[1920px]:hidden">
        <VoteCard teamId={teamId} projectIdeaId={projectIdeaId} users={users} />
        <ContributionCard contributed_by={contributed_by} />
      </div>
      <VoteCard
        teamId={teamId}
        projectIdeaId={projectIdeaId}
        users={users}
        className="hidden min-[1920px]:block"
      />
      <section className="card-body gap-y-7 p-0 w-[1000px] h-[377px] overflow-y-auto pr-5">
        <h2 className="text-xl font-semibold text-base-300">{title}</h2>
        <h3 className="text-base text-neutral-focus font-semibold">
          Project Idea
        </h3>
        <p className="text-base text-base-300 font-medium">{project_idea}</p>
        <h3 className="text-base text-neutral-focus font-semibold">
          Vision Statement
        </h3>
        <p className="text-base text-base-300 font-medium">
          {vision_statement}
        </p>
      </section>
      <ContributionCard
        contributed_by={contributed_by}
        className="hidden min-[1920px]:block"
      />
    </div>
  );
}
