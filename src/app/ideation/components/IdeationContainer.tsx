import { ContributionCard, VoteCard, type Ideation } from ".";

function IdeationContainer({
  title,
  project_idea,
  vision_statement,
  users,
  voted,
  own_idea,
  contributed_by,
}: Ideation) {
  return (
    <div className="card w-full bg-base-200 flex flex-row items-start p-10 gap-x-20">
      <div className="flex flex-col justify-between gap-y-[24px] min-[1920px]:hidden">
        <VoteCard users={users} voted={voted} />
        <ContributionCard own_idea={own_idea} contributed_by={contributed_by} />
      </div>
      <VoteCard
        users={users}
        voted={voted}
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
        own_idea={own_idea}
        contributed_by={contributed_by}
        className="hidden min-[1920px]:block"
      />
    </div>
  );
}

export default IdeationContainer;
