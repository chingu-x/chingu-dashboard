"use client";

import FinalizeIdeationItem from "./FinalizeIdeationItem";
import Button from "@/components/Button";
import { useIdeation } from "@/store/hooks";

export default function FinalizeIdeationList() {
  const { projectIdeas } = useIdeation();

  return (
    <>
      <div className="flex flex-1 flex-col justify-center py-10 gap-y-5 items-center w-full h-[200px] bg-base-100 rounded-2xl shadow-md">
        {projectIdeas.map((projectIdea) => {
          const { id, title, projectIdeaVotes } = projectIdea;
          return (
            <FinalizeIdeationItem
              key={id}
              title={title}
              projectIdeaVotes={projectIdeaVotes}
            />
          );
        })}
      </div>
      <Button variant="secondary">Finalize Project Idea Selection</Button>
    </>
  );
}
