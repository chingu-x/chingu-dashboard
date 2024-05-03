"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import FinalizeIdeationItem from "./FinalizeIdeationItem";
import ConfirmationButton from "./ConfirmationButton";
import Button from "@/components/Button";
import { useIdeation } from "@/store/hooks";
import routePaths from "@/utils/routePaths";

export interface FinalizedIdeation {
  id: number;
  title: string;
}

export default function FinalizeIdeationList() {
  const { projectIdeas } = useIdeation();
  const [finalizedIdeation, setFinalizedIdeation] = useState<FinalizedIdeation>(
    { id: 0, title: "" }
  );
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
    <div className="max-w-[871px] w-full">
      <div className="flex flex-1 flex-col justify-center p-10 gap-y-5 items-center bg-base-100 rounded-2xl">
        {projectIdeas.map((projectIdea) => {
          const { id, title, projectIdeaVotes } = projectIdea;
          return (
            <FinalizeIdeationItem
              key={id}
              title={title}
              projectIdeaVotes={projectIdeaVotes}
              ideationId={id}
              finalizedIdeation={finalizedIdeation}
              setFinalizedIdeation={setFinalizedIdeation}
            />
          );
        })}
      </div>
      <ConfirmationButton finalizedIdeation={finalizedIdeation} />
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
