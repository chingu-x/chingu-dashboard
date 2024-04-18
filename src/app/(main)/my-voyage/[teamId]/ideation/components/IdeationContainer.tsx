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
    <div className="grid grid-rows-[225px_1fr] 3xl:grid-rows-1 grid-cols-[180px_1fr] 3xl:grid-cols-[200px_1fr_200px] items-start justify-items-center gap-y-7 3xl:gap-x-[110px] 2xl:gap-x-20 gap-x-10 w-full p-10 bg-base-200 rounded-2xl">
      <VoteCard
        teamId={teamId}
        projectIdeaId={projectIdeaId}
        users={users}
      />
      <section className="flex flex-col w-full h-full max-h-[400px] 3xl:max-h-[300px] overflow-y-auto overflow-x-hidden row-span-2 gap-y-5 pr-4 3xl:row-auto">
        <h2 className="text-xl font-semibold text-base-300 capitalize">
          {title}
        </h2>
        <h3 className="text-base font-semibold text-neutral-focus">
          Project Idea
        </h3>
        <p className="text-base font-medium text-base-300 whitespace-pre-wrap">
          {project_idea}
        </p>
        <h3 className="text-base font-semibold text-neutral-focus">
          Vision Statement
        </h3>
        <p className="text-base font-medium text-base-300 whitespace-pre-wrap">
          {vision_statement}
        </p>
      </section>
      <ContributionCard
        projectIdeaId={projectIdeaId}
        contributed_by={contributed_by}
      />
    </div>
  );
}
