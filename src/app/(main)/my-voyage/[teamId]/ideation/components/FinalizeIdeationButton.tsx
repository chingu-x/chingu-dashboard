"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import Button from "@/components/Button";
import routePaths from "@/utils/routePaths";
import { useIdeation } from "@/store/hooks";

export default function FinalizeIdeationButton() {
  const { teamId } = useParams<{ teamId: string }>();
  const ideation = useIdeation().projectIdeas;

  return (
    <Link href={routePaths.finalizeIdeationPage(teamId)} className="w-full">
      <Button
        variant="secondary"
        size="lg"
        className="w-full"
        disabled={
          ideation.length === 0 ||
          !ideation.some((i) => i.projectIdeaVotes.length > 0)
        }
      >
        Finalize Selection
      </Button>
    </Link>
  );
}
