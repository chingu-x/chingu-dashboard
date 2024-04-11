"use client";

import { useState } from "react";
import FinalizeIdeationItem from "./FinalizeIdeationItem";
import Button from "@/components/Button";
import { useIdeation } from "@/store/hooks";

export default function FinalizeIdeationList() {
  const { projectIdeas } = useIdeation();
  const [finalizedIdeation, setFinalizedIdeation] = useState("");

  return (
    <div className="w-[871px]">
      <div className="flex flex-1 flex-col justify-center py-10 gap-y-5 items-center bg-base-100 rounded-2xl">
        {projectIdeas.map((projectIdea) => {
          const { id, title, projectIdeaVotes } = projectIdea;
          return (
            <FinalizeIdeationItem
              key={id}
              title={title}
              projectIdeaVotes={projectIdeaVotes}
              finalizedIdeation={finalizedIdeation}
              setFinalizedIdeation={setFinalizedIdeation}
            />
          );
        })}
      </div>
      <Button
        variant="secondary"
        disabled={!finalizedIdeation}
        className="w-full mt-10 mb-4"
      >
        Finalize Project Idea Selection
      </Button>
      <Button
        variant="neutral"
        className="w-full"
      >
        Cancel
      </Button>
    </div>
  );
}
