"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import FinalizeIdeationItem from "./FinalizeIdeationItem";
import Button from "@/components/Button";
import { useIdeation } from "@/store/hooks";
import routePaths from "@/utils/routePaths";

export default function FinalizeIdeationList() {
  const { projectIdeas } = useIdeation();
  const [finalizedIdeation, setFinalizedIdeation] = useState("");
  const router = useRouter();
  const { teamId } = useParams<{ teamId: string }>();

  function handleCancelClick() {
    router.back();
  }

  useEffect(() => {
    if (projectIdeas.length === 0) {
      router.push(routePaths.ideationPage(teamId));
    }
  }, [projectIdeas, router, teamId]);

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
        onClick={handleCancelClick}
      >
        Cancel
      </Button>
    </div>
  );
}
