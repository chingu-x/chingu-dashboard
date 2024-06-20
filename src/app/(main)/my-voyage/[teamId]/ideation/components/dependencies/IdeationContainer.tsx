// import type { Ideation } from "./fixtures/ideation";

interface IdeationContainerProps {
  title: string;
  project_idea: string;
  vision_statement: string;
  isIdeationFinalized: boolean;
  firstChild: JSX.Element;
  secondChild: JSX.Element;
}

export default function IdeationContainer({
  title,
  project_idea,
  vision_statement,
  isIdeationFinalized,
  firstChild,
  secondChild,
}: IdeationContainerProps) {
  return (
    <div
      className={`grid grid-cols-[180px_1fr] grid-rows-[225px_1fr] items-start justify-items-center 3xl:grid-cols-[200px_1fr_200px] 3xl:grid-rows-1 ${
        isIdeationFinalized ? "gap-y-28" : "gap-y-7"
      } h-[500px] w-full gap-x-10 rounded-2xl bg-base-200 p-10 2xl:gap-x-20 3xl:h-[460px] 3xl:gap-x-[110px]`}
    >
      {firstChild}
      <section className="row-span-2 flex h-full max-h-[400px] w-full flex-col gap-y-5 overflow-y-auto overflow-x-hidden pr-4 3xl:row-auto 3xl:max-h-[300px]">
        <h2 className="text-xl font-semibold capitalize text-base-300">
          {title}
        </h2>
        <h3 className="text-base font-semibold text-neutral-focus">
          Project Idea
        </h3>
        <p className="whitespace-pre-wrap text-base font-medium text-base-300">
          {project_idea}
        </p>
        <h3 className="text-base font-semibold text-neutral-focus">
          Vision Statement
        </h3>
        <p className="whitespace-pre-wrap text-base font-medium text-base-300">
          {vision_statement}
        </p>
      </section>
      {secondChild}
    </div>
  );
}
