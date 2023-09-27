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
    <div className="card w-full h-[457px] bg-primary-content text-neutral-content flex flex-row items-start p-10 gap-x-20">
      <VoteCard users={users} voted={voted} />
      <section className="card-body gap-y-7 p-0 w-[1000px] h-[377px] overflow-y-auto pr-5">
        <h2 className="text-xl font-semibold text-neutral-focus">{title}</h2>
        <h3 className="text-base text-neutral-focus font-semibold">
          Project Idea
        </h3>
        <p className="text-base text-base-300 font-medium">
          {project_idea}
        </p>
        <h3 className="text-base text-neutral-focus font-semibold">
          Vision Statement
        </h3>
        <p className="text-base text-neutral-focus font-medium">
          {vision_statement}
        </p>
      </section>
      <ContributionCard own_idea={own_idea} contributed_by={contributed_by} />
    </div>
  );
}

export default IdeationContainer;
